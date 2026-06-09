import { useEffect, useState } from "react";
import { supabase } from "/services/supabase";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeAlert, BadgeMinus, CalendarDays, Eraser, Fuel, Gauge, Search, Star } from "lucide-react";

import Contact from "../components/Contact";
import Footer from "../components/Footer";

function CarCard({ car }) {
    const [imgIndex, setImgIndex] = useState(0);

    const images = car.images || [];

    function nextImage(e) {
        e.stopPropagation();
        setImgIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    }

    function prevImage(e) {
        e.stopPropagation();
        setImgIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    }

    function handleInterest() {
        const phone = "5527998401662"; // +55 Brasil + número

        const message = `
Olá! Tenho interesse neste veículo:

• ${car.brand} ${car.model}
• Ano: ${car.year}
• KM: ${car.km}
• Combustível: ${car.fuel}
• Câmbio: ${car.transmission || "Não informado"}
• Cor: ${car.color || "Não informado"}

• Preço: R$ ${Number(car.price).toLocaleString("pt-BR")}

Poderia me passar mais informações?
`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }

    return (
        <>
            <div className="group relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-[22px] overflow-hidden hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-1">

                {/* IMAGE */}
                <div className="h-40 sm:h-44 md:h-48 relative overflow-hidden bg-zinc-900">

                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={car.model}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${i === imgIndex
                                ? "opacity-100 scale-105"
                                : "opacity-0 scale-100"
                                }`}
                        />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {car.featured && (
                        <span className="absolute cursor-pointer top-2 right-2 text-[9px] uppercase tracking-wider bg-yellow-500/90 text-black px-2 py-1 rounded-full font-bold z-10">
                            Destaque
                        </span>
                    )}

                    {/* NAV */}
                    {images.length > 1 && (
                        <button
                            onClick={prevImage}
                            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full z-10"
                        >
                            ‹
                        </button>
                    )}

                    {images.length > 1 && (
                        <button
                            onClick={nextImage}
                            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full z-10"
                        >
                            ›
                        </button>
                    )}

                    {/* DOTS */}
                    {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImgIndex(i);
                                    }}
                                    className={`w-1 h-1 rounded-full cursor-pointer transition ${i === imgIndex ? "bg-white" : "bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-3 p-3 w-full">

                    <h2 className="text-base sm:text-lg font-semibold tracking-tight">
                        {car.name} {car.model}
                    </h2>

                    {/* SPECS */}
                    <div className="flex flex-col gap-2 text-[10px] sm:text-xs text-zinc-400">
                        <span className="flex gap-1.5"><CalendarDays size={15}/> {car.year}</span>
                        <span className="flex gap-1.5"><Gauge size={15}/> {car.km} km</span>
                        <span className="flex gap-1.5"><Fuel size={15}/> {car.fuel}</span>
                    </div>

                    <div className="flex justify-center h-full gap-1 flex-col">
                        <span className="text-white text-white font-bold text-xl">
                            R$ {Number(car.price).toLocaleString("pt-BR")}
                        </span>

                    </div>
                </div>
                <button
                    onClick={handleInterest}
                    className="p-4 w-full cursor-pointer flex items-center justify-around bg-white text-black font-semibold text-[12px] sm:text-sm active:scale-95 transition"
                >
                    Tenho Interesse <ArrowRight />
                </button>
            </div>

        </>
    );
}

export function Catalogo() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [onlyFeatured, setOnlyFeatured] = useState(false);
    const navigate = useNavigate();

    const [brandFilter, setBrandFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [colorFilter, setColorFilter] = useState("");
    const [maxKm, setMaxKm] = useState("");

    useEffect(() => {
        fetchCars();
    }, []);



    async function fetchCars() {
        setLoading(true);

        let query = supabase
            .from("cars")
            .select("*")
            .eq("status", "available")
            .order("created_at", { ascending: false });

        const { data, error } = await query;

        if (error) {
            console.error(error);
        } else {
            setCars(data);
        }

        setLoading(false);
    }

    const brand = [...new Set(cars.map(car => car.brand))];
    const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
    const colors = [...new Set(cars.map(car => car.color).filter(Boolean))];

    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            car.brand?.toLowerCase().includes(search.toLowerCase()) ||
            car.model?.toLowerCase().includes(search.toLowerCase()) ||
            car.name?.toLowerCase().includes(search.toLowerCase());

        const matchesFeatured =
            onlyFeatured ? car.featured === true : true;

        const matchesBrand =
            brandFilter ? car.brand === brandFilter : true;

        const matchesYear =
            yearFilter ? String(car.year) === yearFilter : true;

        const matchesColor =
            colorFilter ? car.color === colorFilter : true;

        const matchesKm =
            maxKm ? Number(car.km) <= Number(maxKm) : true;

        return (
            matchesSearch &&
            matchesFeatured &&
            matchesBrand &&
            matchesYear &&
            matchesColor &&
            matchesKm
        );
    });

    return (
        <div>
            <NavBar />

            <section className="min-h-screen mt-20 bg-zinc-950 text-white px-4 sm:px-6 py-8">

                {/* HEADER */}
                <div className="max-w-6xl mx-auto mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Catálogo de Veículos
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base">
                        Encontre seu próximo carro aqui
                    </p>
                </div>



                {/* FILTERS */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 mb-6">

                    <input
                        type="text"
                        placeholder="Buscar marca ou modelo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-[13px]"


                    />

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">

                        {/* Modelo */}
                        <select
                            value={brandFilter}
                            onChange={(e) => setBrandFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-[13px]"
                        >
                            <option value="">Marca</option>
                            {brand.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>

                        {/* Ano */}
                        <select
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-[13px]"
                        >
                            <option value="">Ano</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        {/* Cor */}
                        <select
                            value={colorFilter}
                            onChange={(e) => setColorFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-[13px]"
                        >
                            <option value="">Cor</option>
                            {colors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>

                        {/* KM */}
                        <input
                            type="number"
                            placeholder="KM Máx."
                            value={maxKm}
                            onChange={(e) => setMaxKm(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-[13px]"
                        />

                        {/* Destaques */}
                        <button
                            onClick={() => setOnlyFeatured(!onlyFeatured)}
                            className={`p-2 flex justify-center gap-4 items-center col-span-1 rounded-lg cursor-pointer text-[13px] border transition ${onlyFeatured
                                ? "bg-yellow-500 text-black border-yellow-400 font-semibold"
                                : "bg-zinc-900 border-yellow-400 text-yellow-400"
                                }`}
                        >
                            <Star size={20} /><h1>Destaques</h1>
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setBrandFilter("");
                                    setYearFilter("");
                                    setColorFilter("");
                                    setMaxKm("");
                                    setOnlyFeatured(false);
                                }}
                                className="p-2 rounded-lg cursor-pointer bg-zinc-800 border border-white/10 text-[13px]"
                            >
                                Limpar
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="p-2 rounded-lg flex cursor-pointer justify-between items-center text-black text-[13px] bg-white border-white/10 border"
                            >
                                <ArrowLeft size={20} /> <h1>Voltar</h1>
                            </button>
                        </div>
                    </div>

                    {/* Ações */}

                </div>

                {/* Filtros */}


                {/* GRID */}
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <p className="text-zinc-400">Carregando veículos...</p>
                    ) : filteredCars.length === 0 ? (
                        <p className="text-zinc-500">Nenhum carro encontrado.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                            {filteredCars.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}

                        </div>

                    )}

                </div>

            </section>
            <Contact />
            <Footer />
        </div>
    );
}

export default Catalogo;