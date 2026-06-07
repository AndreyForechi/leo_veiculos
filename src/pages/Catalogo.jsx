import { useEffect, useState } from "react";
import { supabase } from "/services/supabase";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {car.featured && (
                        <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider bg-yellow-500/90 text-black px-2 py-1 rounded-full font-bold z-10">
                            Destaque
                        </span>
                    )}

                    {/* NAV */}
                    {images.length > 1 && (
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full z-10"
                        >
                            ‹
                        </button>
                    )}

                    {images.length > 1 && (
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full z-10"
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
                        {car.brand} {car.model}
                    </h2>

                    {/* SPECS */}
                    <div className="flex flex-col gap-2 text-[10px] sm:text-xs text-zinc-400">
                        <span className="">• {car.year}</span>
                        <span className="">• {car.km} km</span>
                        <span className="">• {car.fuel}</span>
                    </div>

                    <p className="text-zinc-500 text-[10px] sm:text-xs line-clamp-2">
                        {car.description}
                    </p>

                    <div className="flex justify-center h-full gap-1 flex-col">
                        <span className="text-green-400 font-bold text-base sm:text-lg">
                            R$ {Number(car.price).toLocaleString("pt-BR")}
                        </span>

                    </div>
                </div>
                <button
                    onClick={handleInterest}
                    className="p-4 w-full flex items-center justify-around bg-white text-black font-semibold text-[12px] sm:text-sm active:scale-95 transition"
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

    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            car.brand?.toLowerCase().includes(search.toLowerCase()) ||
            car.model?.toLowerCase().includes(search.toLowerCase());

        const matchesFeatured = onlyFeatured ? car.featured === true : true;

        return matchesSearch && matchesFeatured;
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
                        className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setOnlyFeatured(!onlyFeatured)}
                            className={`px-4 py-2.5 rounded-xl text-sm border transition ${onlyFeatured
                                ? "bg-yellow-500 text-black border-yellow-400 font-semibold"
                                : "bg-zinc-900 border-white/10"
                                }`}
                        >
                            Destaques
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="px-4 py-2.5 rounded-xl text-black text-sm bg-white border-white/10 border"
                        >
                            Voltar
                        </button>
                    </div>
                </div>

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

        </div>
    );
}

export default Catalogo;