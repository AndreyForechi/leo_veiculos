import { Phone, ArrowRight } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 px-6 mb-20">
            <div className="max-w-5xl mx-auto">

                <div className="bg-zinc-900 border border-white/10 rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">

                    {/* Glow background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-yellow-400/10 blur-[140px] rounded-full" />

                    <div className="relative z-10 flex flex-col gap-6 items-center">

                        <span className="border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 px-5 py-2 rounded-full text-sm">
                            Atendimento rápido via WhatsApp
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
                            Encontrou o carro ideal ou quer ver mais{" "}
                            <span className="text-yellow-400">
                                opções?
                            </span>
                        </h2>

                        <p className="text-zinc-400 text-lg max-w-2xl leading-8">
                            Nossa equipe está pronta para te ajudar a encontrar
                            o veículo perfeito para seu perfil, com atendimento
                            transparente e negociação facilitada.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-2">
                            <div className="bg-black w-60 border border-white/10 px-5 py-3 rounded-full text-sm text-zinc-300">
                                ✓ Atendimento personalizado
                            </div>

                            <div className="bg-black border w-60 border-white/10 px-5 py-3 rounded-full text-sm text-zinc-300">
                                ✓ Veículos selecionados
                            </div>

                            <div className="bg-black border w-60 border-white/10 px-5 py-3 rounded-full text-sm text-zinc-300">
                                ✓ Negociação transparente
                            </div>
                        </div>

                        <a
                            href="https://wa.me/5527998401662?text=Olá,%20gostaria%20de%20ver%20mais%20veículos%20disponíveis."
                            target="_blank"
                            className="mt-5 flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold hover:scale-105 transition"
                        >
                            Falar no WhatsApp
                            <Phone />
                        </a>

                        <p className="text-zinc-500 text-sm">
                            Tire dúvidas, consulte disponibilidade e encontre o carro ideal.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;