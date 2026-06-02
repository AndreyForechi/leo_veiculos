import { motion } from "framer-motion";

import {
    ArrowRight,
} from "lucide-react";

export function Hero() {
    return (
        <section className="min-h-screen relative flex items-center justify-center px-6 text-center" id="home">
            <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black/80 to-transparent z-0" />
            <img src="/audi.png" alt="" className="absolute -z-10 inset-0 overflow-hidden object-cover w-full h-full blur-[3px]" />
            <div className="absolute -bottom-2 left-0 w-full h-20 bg-linear-to-t from-black to-transparent z-0" />
            <div className="max-w-5xl">
                <motion.h1
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl md:text-7xl font-bold leading-tight"
                >
                    Encontre aqui o carro
                    <span className="text-yellow-400"> dos seus sonhos!</span>

                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-400 text-lg mt-8 max-w-2xl mx-auto leading-8"
                >
                    Trabalhamos com veículos revisados, procedência garantida e atendimento transparente para você comprar com segurança.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex justify-center gap-4 flex-wrap"
                >
                    <a
                        href="#projects"
                        className="bg-white w-50 justify-center text-black px-2 py-4 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2"
                    >
                        Ver Estoque
                        <ArrowRight size={18} />
                    </a>

                    <a
                        href="#contact"
                        className="border w-50 border-white/20 px-2 py-4 rounded-full hover:bg-white hover:text-black transition"
                    >
                        Falar no WhatsApp
                    </a>
                </motion.div>
            </div>

        </section>
    )
}

export default Hero