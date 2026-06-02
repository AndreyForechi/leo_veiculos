import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export function Servicos() {
    const scrollRef = useRef(null);

    const carros = [
        {
            nome: "Mitsubishi Lancer GT",
            ano: "2015",
            km: "85.000 km",
            preco: "R$ 64.900",
        },
        {
            nome: "Honda Civic Touring",
            ano: "2020",
            km: "45.000 km",
            preco: "R$ 129.900",
        },
        {
            nome: "Audi A3 Sedan",
            ano: "2018",
            km: "62.000 km",
            preco: "R$ 114.900",
        },
        {
            nome: "BMW 320i",
            ano: "2019",
            km: "58.000 km",
            preco: "R$ 189.900",
        },
        {
            nome: "Jetta GLI",
            ano: "2021",
            km: "32.000 km",
            preco: "R$ 179.900",
        },
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -360 : 360,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="projects" className="py-24 px-6 bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
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

                    {/* Botões */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="cursor-pointer bg-zinc-900 border border-white/10 p-4 rounded-full hover:bg-white hover:text-black transition"
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            onClick={() => scroll("right")}
                            className="cursor-pointer bg-zinc-900 border border-white/10 p-4 rounded-full hover:bg-white hover:text-black transition"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                {/* Carrossel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth touch-pan-x snap-x snap-mandatory"
                >
                    {carros.map((carro, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="min-w-[300px] snap-start sm:min-w-[340px] bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition shrink-0"
                        >
                            {/* Placeholder imagem */}
                            <div className="h-60 bg-white flex items-center justify-center">
                                <span className="text-black font-semibold">
                                    Foto do carro
                                </span>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-semibold">
                                    {carro.nome}
                                </h3>

                                <div className="flex gap-3 text-sm text-zinc-400 mt-3">
                                    <span>{carro.ano}</span>
                                    <span>•</span>
                                    <span>{carro.km}</span>
                                </div>

                                <h4 className="text-3xl font-bold mt-5">
                                    {carro.preco}
                                </h4>

                                <button className="mt-6 w-full bg-white text-black py-4 rounded-full font-semibold hover:scale-[1.02] transition">
                                    Tenho Interesse
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Botão ver mais veículos */}
                <div className="flex justify-center mt-12">
                    <a
                        href="https://wa.me/5527998401662?text=Olá,%20gostaria%20de%20ver%20mais%20veículos%20disponíveis."
                        target="_blank"
                        className="group flex items-center gap-3 border border-white/10 bg-zinc-900 px-8 py-5 rounded-full text-lg font-medium hover:bg-white hover:text-black transition duration-300"
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