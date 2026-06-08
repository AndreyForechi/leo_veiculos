import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function VeiculosVendidos() {
    const vendidos = [
        {
            nome: "Evoque",
            ano: "2020",
            entregue: "Entregue em Março",
            imagem: "./public/vendido_1.webp",
        },
        {
            nome: "S10 LTZ",
            ano: "2019",
            entregue: "Entregue em Abril",
            imagem: "./public/vendido_2.webp",
        },
        {
            nome: "Moto",
            ano: "2018",
            entregue: "Entregue em Maio",
            imagem: "./public/vendido_3.webp",
        },
    ];

    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-left sm:text-center mb-14">
                    <h2 className="text-5xl font-bold">
                        Veículos já <span className="text-yellow-400">entregues</span>
                    </h2>

                    <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
                        Confira alguns veículos já entregues aos nossos clientes.
                        Qualidade, transparência e confiança em cada negociação.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendidos.map((carro, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -6 }}
                            className="bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition"
                        >
                            {/* Imagem placeholder */}
                            <div className="relative h-72 bg-white flex items-center justify-center">

                                {/* Badge vendido */}
                                <div className="absolute top-5 left-5 bg-yellow-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-semibold text-sm">
                                    <CheckCircle size={18} />
                                    Vendido
                                </div>

                                <img src={carro.imagem} alt={carro.nome} className="object-cover h-full w-full" />
                            </div>

                            {/* Conteúdo */}
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold">
                                    {carro.nome}
                                </h3>

                                <p className="text-zinc-400 mt-2">
                                    Ano {carro.ano}
                                </p>

                                <div className="mt-5 border-t border-white/10 pt-5">
                                    <p className="text-yellow-400 font-medium">
                                        ✓ {carro.entregue}
                                    </p>

                                    <p className="text-zinc-500 text-sm mt-2">
                                        Mais um cliente realizando o sonho do
                                        veículo ideal.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default VeiculosVendidos;    