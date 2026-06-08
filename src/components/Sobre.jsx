

import { motion } from "framer-motion";

import {
    Sparkles,
    ShieldCheck,
    Award,

} from "lucide-react";

export function Sobre() {
    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold mb-7">
                    Por que comprar <span className="text-yellow-400">conosco?</span>
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden rounded-4xl"
                    >
                        <img
                            src="/sobre.webp"
                            className="bg-white text-center flex flex-col hover:scale-103 justify-center text-black w-full h-137.5 object-cover transition duration-700"


                        />


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="border border-white/10 rounded-4xl p-10 bg-zinc-950"
                    >
                        <h3 className="text-2xl font-semibold mb-6">
                            Veículos selecionados com qualidade e confiança
                        </h3>

                        <p className="text-zinc-400 text-md leading-8">
                            Trabalhamos com veículos cuidadosamente selecionados,
                            prezando por procedência, qualidade e transparência em cada negociação.
                            Nosso objetivo é ajudar você a encontrar o carro ideal
                            com segurança e confiança.
                        </p>

                        <p className="text-zinc-400 text-lmd leading-8 mt-3">
                            Oferecemos atendimento personalizado, veículos revisados
                            e suporte completo para tornar sua experiência de compra
                            mais prática, segura e sem complicações.
                        </p>

                        {/* Cards */}
                        <div className="grid sm:grid-cols-3 gap-4 mt-5">
                            <div className="bg-black border border-white/10 rounded-3xl p-5 hover:border-white/20 transition">
                                <ShieldCheck className="text-zinc-400 mb-3" />
                                <h4 className="font-semibold">
                                    Procedência Garantida
                                </h4>

                                <p className="text-zinc-500 text-sm mt-2">
                                    Veículos selecionados com transparência.
                                </p>
                            </div>

                            <div className="bg-black border border-white/10 rounded-3xl p-5 hover:border-white/20 transition">
                                <Sparkles className="text-zinc-400 mb-3" />
                                <h4 className="font-semibold">
                                    Qualidade Premium
                                </h4>

                                <p className="text-zinc-500 text-sm mt-2">
                                    Carros revisados e prontos para você.
                                </p>
                            </div>

                            <div className="bg-black border border-white/10 rounded-3xl p-5 hover:border-white/20 transition">
                                <Award className="text-zinc-400 mb-3" />
                                <h4 className="font-semibold">
                                    Atendimento Transparente
                                </h4>

                                <p className="text-zinc-500 text-sm mt-2">
                                    Negociação clara e suporte em todo processo.
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-10 mt-10 border-t border-white/10 pt-8 text-center sm:text-left justify-center sm:justify-start">
                            <div className="flex flex-col">
                                <h2 className="text-4xl font-bold">
                                    +200
                                </h2>

                                <p className="text-zinc-500">
                                    Veículos vendidos
                                </p>
                            </div>

                            <div>
                                <h2 className="text-4xl font-bold">
                                    +5
                                </h2>

                                <p className="text-zinc-500">
                                    Anos de confiança
                                </p>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Sobre