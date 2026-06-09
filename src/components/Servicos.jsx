import { motion } from "framer-motion";
import { Calendar, CalendarDays, ChevronLeft, ChevronRight, Gauge } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "/services/supabase";

export function Servicos() {
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    async function fetchCars() {
        setLoading(true);

        const { data, error } = await supabase
            .from("cars")
            .select("*")
            .eq("status", "available")
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) {
            console.error(error);
        } else {
            setCars(data || []);
        }

        setLoading(false);
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -360 : 360,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-24 px-6 bg-zinc-950 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-5xl font-bold">
                            Veículos em{" "}
                            <span className="text-yellow-400">
                                destaque
                            </span>
                        </h2>

                        <p className="text-zinc-400 mt-3">
                            Confira alguns veículos disponíveis no estoque.
                        </p>
                    </div>

                    {/* BOTÕES */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="bg-zinc-900 cursor-pointer border border-white/10 p-4 rounded-full hover:bg-white hover:text-black transition"
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            onClick={() => scroll("right")}
                            className="bg-zinc-900 cursor-pointer border border-white/10 p-4 rounded-full hover:bg-white hover:text-black transition"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                {/* LOADING */}
                {loading ? (
                    <p className="text-zinc-400">
                        Carregando veículos...
                    </p>
                ) : (
                    /* CARROSSEL */
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth touch-pan-x snap-x snap-mandatory"
                    >
                        {cars.filter((car) => car.featured === true).map((car) => (
                            <motion.div
                                key={car.id}
                                whileHover={{ y: -5 }}
                                className="min-w-[300px] sm:min-w-[340px] snap-start bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition shrink-0"
                            >
                                {/* IMAGE */}
                                <div className="h-60 bg-zinc-800 flex items-center justify-center">
                                    <img
                                        src={car.images?.[0]}
                                        alt={car.model}
                                        className="w-80 h-full object-cover"
                                    ></img>
                                </div>

                                {/* CONTENT */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold">
                                        {car.name} {car.model}
                                    </h3>

                                    <div className="flex gap-3 text-sm text-zinc-400 mt-3">
                                        <span className="flex gap-1.5"><CalendarDays size={20}/>{car.year}</span>
                                        <span>•</span>
                                        <span className="flex gap-1.5"><Gauge size={20}/>{car.km} km</span>
                                    </div>

                                    <h4 className="text-3xl font-bold mt-5 text-yellow-400">
                                        R$ {Number(car.price).toLocaleString("pt-BR")}
                                    </h4>

                                    <button className="mt-6 w-full cursor-pointer bg-white text-black py-4 rounded-full font-semibold hover:scale-[1.02] transition">
                                        Tenho Interesse
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* BOTÃO VER MAIS */}
                <div className="flex justify-center mt-12">
                    <a
                        onClick={() => navigate("/catalogo")}
                        className="cursor-pointer group flex items-center gap-3 border border-white/10 bg-zinc-900 px-8 py-5 rounded-full text-lg font-medium hover:bg-white hover:text-black transition duration-300"
                    >
                        Ver mais veículos

                        <ChevronRight
                            size={22}
                            className="transition group-hover:translate-x-1"
                        />
                    </a>
                </div>

            </div>
        </section>
    );
}

export default Servicos;