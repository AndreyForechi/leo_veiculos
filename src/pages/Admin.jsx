import { useEffect, useState } from "react";
import { supabase } from "/services/supabase";
import NavAdmin from "../components/NavAdmin";

import { useNavigate } from "react-router-dom";

export default function AdminCars() {
    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [checkingAuth, setCheckingAuth] =
        useState(true);

    const [editModal, setEditModal] =
        useState(false);

    const [editingCar, setEditingCar] =
        useState(null);

    const [editForm, setEditForm] =
        useState({
            name: "",
            brand: "",
            model: "",
            year: "",
            price: "",
            km: "",
            fuel: "",
            transmission: "",
            color: "",
            description: "",
            featured: false,
            status: "available",
        });

    const [form, setForm] = useState({
        name: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        km: "",
        fuel: "",
        transmission: "",
        color: "",
        description: "",
        featured: false,
        status: "available",
    });

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function fetchCars(searchTerm = "") {
        let query = supabase
            .from("cars")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (searchTerm.trim()) {
            query = query.or(
                `name.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`
            );
        }

        const { data, error } = await query;

        if (error) {
            console.error(error);
            return;
        }

        setCars(data);
    }

    async function deleteCar(car) {
        const confirmDelete = confirm(
            `Deseja excluir ${car.name}?`
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);

            // remover imagens do storage
            if (
                car.images &&
                car.images.length > 0
            ) {
                const filePaths = car.images.map(
                    (url) => {
                        return url.split(
                            "/storage/v1/object/public/cars/"
                        )[1];
                    }
                );

                const { error: storageError } =
                    await supabase.storage
                        .from("cars")
                        .remove(filePaths);

                if (storageError) {
                    console.error(
                        storageError
                    );
                }
            }

            // remover do banco
            const { error } = await supabase
                .from("cars")
                .delete()
                .eq("id", car.id);

            if (error) throw error;

            // atualizar lista
            setCars((prev) =>
                prev.filter(
                    (item) =>
                        item.id !== car.id
                )
            );
        } catch (error) {
            console.error(error);
            alert(
                "Erro ao excluir veículo"
            );
        } finally {
            setLoading(false);
        }
    }

    function openEditModal(car) {
        setEditingCar(car);

        setEditForm({
            name: car.name || "",
            brand: car.brand || "",
            model: car.model || "",
            year: car.year || "",
            price: car.price || "",
            km: car.km || "",
            fuel: car.fuel || "",
            transmission:
                car.transmission || "",
            color: car.color || "",
            description:
                car.description || "",
            featured:
                car.featured || false,
            status:
                car.status || "available",
        });

        setEditModal(true);
    }

    function handleEditChange(e) {
        const {
            name,
            value,
            checked,
            type,
        } = e.target;

        setEditForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    }

    async function updateCar() {
        try {
            setLoading(true);

            const { error } =
                await supabase
                    .from("cars")
                    .update({
                        ...editForm,
                        year: Number(
                            editForm.year
                        ),
                        km: Number(
                            editForm.km
                        ),
                        price: Number(
                            editForm.price
                        ),
                    })
                    .eq(
                        "id",
                        editingCar.id
                    );

            if (error) throw error;

            setCars((prev) =>
                prev.map((car) =>
                    car.id ===
                        editingCar.id
                        ? {
                            ...car,
                            ...editForm,
                        }
                        : car
                )
            );

            setEditModal(false);
            setEditingCar(null);
        } catch (error) {
            console.error(error);
            alert(
                "Erro ao atualizar veículo"
            );
        } finally {
            setLoading(false);
        }
    }

    function handleImages(e) {
        const files = Array.from(
            e.target.files
        );

        setImages((prev) => [
            ...prev,
            ...files,
        ]);

        const previews = files.map(
            (file) =>
                URL.createObjectURL(file)
        );

        setPreviewImages((prev) => [
            ...prev,
            ...previews,
        ]);
    }

    async function uploadImages() {
        const urls = [];

        for (const image of images) {
            const extension = image.name
                .split(".")
                .pop();

            const fileName =
                `${crypto.randomUUID()}.${extension}`;

            const { data, error } =
                await supabase.storage
                    .from("cars")
                    .upload(fileName, image);

            console.log(data);
            console.log(error);

            if (error) throw error;

            const { data: publicUrlData } =
                supabase.storage
                    .from("cars")
                    .getPublicUrl(fileName);

            urls.push(publicUrlData.publicUrl);
        }

        return urls;
    }

    function removeImage(index) {
        setImages((prev) =>
            prev.filter(
                (_, i) => i !== index
            )
        );

        setPreviewImages((prev) =>
            prev.filter(
                (_, i) => i !== index
            )
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !form.name ||
            !form.brand ||
            !form.model ||
            !form.year ||
            !form.price ||
            !form.km ||
            !form.fuel ||
            !form.transmission ||
            !form.color ||
            !form.description
        ) {
            alert("Preencha todos os campos");
            return;
        }

        if (images.length === 0) {
            alert("Adicione pelo menos uma imagem");
            return;
        }

        try {
            setLoading(true);

            let imageUrls = [];

            if (images.length > 0) {
                imageUrls = await uploadImages();
            }

            const { error } = await supabase
                .from("cars")
                .insert([
                    {
                        ...form,
                        year: Number(form.year),
                        km: Number(form.km),
                        price: Number(form.price),
                        images: imageUrls,
                    },
                ]);

            if (error) throw error;


            setForm({
                name: "",
                brand: "",
                model: "",
                year: "",
                price: "",
                km: "",
                fuel: "",
                transmission: "",
                color: "",
                description: "",
                featured: false,
                status: "available",
            });

            setImages([]);
            setPreviewImages([]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchCars(search);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        async function checkUser() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                navigate("/login");
                return;
            }

            setCheckingAuth(false);
        }

        checkUser();
    }, []);

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                Carregando...
            </div>
        );
    }



    return (
        <>
            <NavAdmin />
            <div className="min-h-screen bg-zinc-950 mt-20 text-white p-8" id="painel">
                <div className="max-w-6xl mx-auto" >

                    <div className="mb-10">
                        <h1 className="text-4xl font-bold">
                            Painel Administrativo
                        </h1>

                        <p className="text-zinc-400 mt-2">
                            Adicione veículos ao catálogo.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
                    >
                        <div className="grid md:grid-cols-2 gap-5">

                            <Input
                                label="Nome do carro"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />

                            <Input
                                label="Marca"
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                            />

                            <Input
                                label="Modelo"
                                name="model"
                                value={form.model}
                                onChange={handleChange}
                            />

                            <Input
                                label="Ano"
                                name="year"
                                type="number"
                                value={form.year}
                                onChange={handleChange}
                            />

                            <Input
                                label="Preço"
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                            />

                            <Input
                                label="KM"
                                name="km"
                                type="number"
                                value={form.km}
                                onChange={handleChange}
                            />

                            <Input
                                label="Combustível"
                                name="fuel"
                                value={form.fuel}
                                onChange={handleChange}
                            />

                            <Input
                                label="Câmbio"
                                name="transmission"
                                value={form.transmission}
                                onChange={handleChange}
                            />

                            <Input
                                label="Cor"
                                name="color"
                                value={form.color}
                                onChange={handleChange}
                            />

                            <div>
                                <label className="block mb-2 text-sm text-zinc-400">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 outline-none"
                                >
                                    <option value="available">
                                        Disponível
                                    </option>

                                    <option value="sold">
                                        Vendido
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="block mb-2 text-sm text-zinc-400">
                                Descrição
                            </label>

                            <textarea
                                rows={5}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 outline-none resize-none"
                            />
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={form.featured}
                                onChange={handleChange}
                            />

                            <label>
                                Veículo em destaque
                            </label>
                        </div>

                        <div className="mt-6">
                            <label className="block mb-2 text-sm text-zinc-400">
                                Fotos do carro
                            </label>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImages}
                                className="w-full border border-dashed border-zinc-700 rounded-2xl p-6 bg-zinc-950"
                            />
                        </div>

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {previewImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative"
                                    >
                                        <img
                                            src={image}
                                            alt=""
                                            className="rounded-2xl h-40 w-full object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeImage(index)
                                            }
                                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-500 transition"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-8 w-full bg-white text-black font-semibold py-4 rounded-2xl hover:opacity-90 transition"
                        >
                            {loading
                                ? "Salvando..."
                                : "Cadastrar veículo"}
                        </button>
                    </form>
                </div>
                <div className="flex max-w-6xl mx-auto flex-col mt-10 md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Veículos cadastrados
                        </h2>

                        <p className="text-zinc-400 text-sm mt-1">
                            Busque por nome, marca ou modelo
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar veículo..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full md:w-80 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-zinc-600 transition"
                    />
                </div>
                <div className="mt-10 px:0 mx-auto max-w-6xl">

                    {cars.length === 0 && (
                        <p className="text-zinc-400 text-center py-20">
                            Nenhum veículo encontrado.
                        </p>
                    )}

                    {/* MOBILE */}
                    <div className="flex flex-col gap-4 md:hidden" id="veiculos">
                        {cars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
                            >
                                <img
                                    src={car.images?.[0]}
                                    alt={car.name}
                                    className="w-full h-44 object-cover"
                                />

                                <div className="p-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                {car.name}
                                            </h3>

                                            <p className="text-zinc-400 text-sm">
                                                {car.brand} • {car.model}
                                            </p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${car.status === "available"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            {car.status === "available"
                                                ? "Disponível"
                                                : "Vendido"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                                        <div>
                                            <p className="text-zinc-500">
                                                Ano
                                            </p>
                                            <p>{car.year}</p>
                                        </div>

                                        <div>
                                            <p className="text-zinc-500">
                                                KM
                                            </p>
                                            <p>
                                                {Number(car.km).toLocaleString("pt-BR")}
                                            </p>
                                        </div>

                                        <div className="col-span-2">
                                            <p className="text-zinc-500">
                                                Preço
                                            </p>

                                            <p className="font-bold text-lg">
                                                {Number(
                                                    car.price
                                                ).toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-5">
                                        <button
                                            onClick={() =>
                                                openEditModal(car)
                                            }
                                            className="flex-1 py-3 rounded-2xl bg-blue-500/20 text-blue-400"
                                        >
                                            Editar
                                        </button>

                                        <button onClick={() =>
                                            deleteCar(car)
                                        }
                                            className="flex-1 py-3 rounded-2xl bg-red-500/20 text-red-400"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden md:block overflow-x-auto border border-zinc-800 rounded-3xl bg-zinc-900" id="veiculos">
                        <table className="w-full">
                            <thead className="border-b border-zinc-800 bg-zinc-950">
                                <tr>
                                    <th className="text-left p-5">
                                        Foto
                                    </th>

                                    <th className="text-left p-5">
                                        Veículo
                                    </th>

                                    <th className="text-left p-5">
                                        Ano
                                    </th>

                                    <th className="text-left p-5">
                                        Preço
                                    </th>

                                    <th className="text-left p-5">
                                        Status
                                    </th>

                                    <th className="text-left p-5">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {cars.map((car) => (
                                    <tr
                                        key={car.id}
                                        className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                                    >
                                        <td className="p-5">
                                            <img
                                                src={car.images?.[0]}
                                                alt=""
                                                className="w-28 h-20 rounded-xl object-cover"
                                            />
                                        </td>

                                        <td className="p-5">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {car.name}
                                                </h3>

                                                <p className="text-zinc-400 text-sm">
                                                    {car.brand} • {car.model}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-5">
                                            {car.year}
                                        </td>

                                        <td className="p-5 font-semibold">
                                            {Number(
                                                car.price
                                            ).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </td>

                                        <td className="p-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${car.status === "available"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {car.status === "available"
                                                    ? "Disponível"
                                                    : "Vendido"}
                                            </span>
                                        </td>

                                        <td className="p-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        openEditModal(car)
                                                    }
                                                    className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                                                >
                                                    Editar
                                                </button>

                                                <button onClick={() => deleteCar(car)} className="px-4 cursor-pointer py-2 rounded-xl bg-red-500/20 text-red-400">
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {editModal && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8">

                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">
                                    Editar veículo
                                </h2>

                                <button
                                    onClick={() =>
                                        setEditModal(false)
                                    }
                                    className="text-zinc-400 hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">

                                <Input
                                    label="Nome"
                                    name="name"
                                    value={editForm.name}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Marca"
                                    name="brand"
                                    value={editForm.brand}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Modelo"
                                    name="model"
                                    value={editForm.model}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Ano"
                                    type="number"
                                    name="year"
                                    value={editForm.year}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Preço"
                                    type="number"
                                    name="price"
                                    value={editForm.price}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="KM"
                                    type="number"
                                    name="km"
                                    value={editForm.km}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Combustível"
                                    name="fuel"
                                    value={editForm.fuel}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Câmbio"
                                    name="transmission"
                                    value={
                                        editForm.transmission
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <Input
                                    label="Cor"
                                    name="color"
                                    value={editForm.color}
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <div>
                                    <label className="block mb-2 text-sm text-zinc-400">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={
                                            editForm.status
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4"
                                    >
                                        <option value="available">
                                            Disponível
                                        </option>

                                        <option value="sold">
                                            Vendido
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="block mb-2 text-sm text-zinc-400">
                                    Descrição
                                </label>

                                <textarea
                                    rows={5}
                                    name="description"
                                    value={
                                        editForm.description
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 resize-none"
                                />
                            </div>

                            <button
                                onClick={updateCar}
                                disabled={loading}
                                className="w-full mt-8 bg-white text-black font-semibold py-4 rounded-2xl hover:opacity-90 transition"
                            >
                                {loading
                                    ? "Salvando..."
                                    : "Salvar alterações"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
}) {
    return (
        <div>
            <label className="block mb-2 text-sm text-zinc-400">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 outline-none focus:border-zinc-600 transition"
            />
        </div>
    );
}