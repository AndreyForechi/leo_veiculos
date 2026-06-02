import { motion } from "framer-motion";
import { Star, ShieldCheck, Car, BadgeCheck } from "lucide-react";
import reviews from "./Reviews";

export function Reviews() {
    return (
        <section className="py-24 px-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <div className="text-left sm:text-center">
                        <h2 className="text-5xl font-bold">
                            Clientes que confiaram na nossa{" "}
                            <span className="text-yellow-400">
                                experiência
                            </span>
                        </h2>

                        <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
                            Transparência, procedência e atendimento de qualidade
                            para ajudar você a encontrar o veículo ideal.
                        </p>
                    </div>
                </motion.div>

                {/* Stats premium */}
                <div className="grid md:grid-cols-3 gap-5 mb-14">
                    <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-7 text-center">
                        <Car className="mx-auto mb-4 text-yellow-400" size={34} />

                        <h3 className="text-4xl font-bold">
                            +250
                        </h3>

                        <p className="text-zinc-500 mt-2">
                            Veículos entregues
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-7 text-center">
                        <Star className="mx-auto mb-4 text-yellow-400" size={34} />

                        <h3 className="text-4xl font-bold">
                            4.9/5
                        </h3>

                        <p className="text-zinc-500 mt-2">
                            Avaliação média
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-7 text-center">
                        <ShieldCheck className="mx-auto mb-4 text-yellow-400" size={34} />

                        <h3 className="text-4xl font-bold">
                            100%
                        </h3>

                        <p className="text-zinc-500 mt-2">
                            Transparência na negociação
                        </p>
                    </div>
                </div>

                {/* Reviews */}
                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-yellow-400/30 hover:-translate-y-1 transition duration-300"
                        >
                            {/* estrelas */}
                            <div className="flex gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* texto */}
                            <p className="text-zinc-300 text- leading-8 italic">
                                "{review.text}"
                            </p>

                            {/* cliente */}
                            <div className="mt-6 border-t border-white/10 pt-5 flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-lg">
                                        {review.name}
                                    </h4>

                                    <p className="text-zinc-500 text-sm">
                                        Cliente satisfeito
                                    </p>
                                </div>

                                <BadgeCheck
                                    className="text-yellow-400"
                                    size={26}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reviews;