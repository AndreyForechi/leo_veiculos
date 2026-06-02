import { motion } from "framer-motion";
import { ArrowRight, Fuel, Gauge, Calendar } from "lucide-react";

export function CarroDoMes() {
    return (
        <section className="py-28 px-6 bg-black overflow-hidden">
            <div className="max-w-6xl mx-auto">

                <div className="relative bg-zinc-900 border border-white/10 rounded-[40px] overflow-hidden">

                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[140px]" />

                    <div className="grid lg:grid-cols-2 items-center">

                        {/* Lado esquerdo */}
                        <div className="p-10 md:p-16 relative z-10">

                            <span className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-5 py-2 rounded-full text-sm font-medium">
                                🚘 Carro do mês
                            </span>

                            <h2 className="text-3xl md:text-7xl font-bold mt-6 leading-tight">
                                BMW 320i
                                <span className="text-yellow-400">
                                    {" "}M Sport
                                </span>
                            </h2>

                            <p className="text-zinc-400 text-lg mt-6 leading-8 max-w-xl">
                                Elegância, esportividade e tecnologia em um
                                único veículo. Um sedan premium para quem
                                busca conforto e performance.
                            </p>

                            {/* Informações */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">

                                <div className="bg-black border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">
                                    <Calendar className="text-yellow-400" />
                                    <div>
                                        <p className="text-zinc-500 text-sm">
                                            Ano
                                        </p>
                                        <p className="font-medium">
                                            2021
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black border sm:col-span-2 md:col-span-2 border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">
                                    <Gauge className="text-yellow-400" />
                                    <div>
                                        <p className="text-zinc-500 text-sm">
                                            KM
                                        </p>
                                        <p className="font-medium">
                                            38.000
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black border sm:col-span-3 md:col-span-3 border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">
                                    <Fuel className="text-yellow-400" />
                                    <div>
                                        <p className="text-zinc-500 text-sm">
                                            Combustível
                                        </p>
                                        <p className="font-medium">
                                            Flex
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Preço */}
                            <div className="mt-10">
                                <p className="text-zinc-500 text-md">
                                    A partir de
                                </p>

                                <h3 className="sm:text-5xl text-4xl font-bold mt-1">
                                    R$ 189.900
                                </h3>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-4 mt-10">
                                <a
                                    href="https://wa.me/5527998401662?text=Olá,%20tenho%20interesse%20no%20BMW%20320i%20M%20Sport."
                                    target="_blank"
                                    className="bg-white text-black w-full justify-center px-8 py-5 rounded-full font-semibold hover:scale-105 transition flex items-center gap-3"
                                >
                                    Tenho interesse
                                    <ArrowRight size={20} />
                                </a>

                                <button className="border w-full border-white/10 px-8 py-5 rounded-full hover:bg-white hover:text-black transition">
                                    Ver detalhes
                                </button>
                            </div>
                        </div>

                        {/* Lado direito */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative h-full flex items-center justify-center p-10"
                        >
                            <img
                                src="/bmw.jpeg"
                                alt="BMW"
                                className="w-full max-w-[700px] rounded-3xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CarroDoMes;