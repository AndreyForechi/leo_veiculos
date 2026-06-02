import {
    Phone,
    MapPin,
    ChevronRight,
    MessageCircleHeart
} from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-zinc-950 px-6 py-16">
            <div className="max-w-7xl mx-auto">

                <div className="grid md:grid-cols-4 gap-12">

                    {/* Logo / descrição */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div
                                
                                className="w-14 bg-white h-14 rounded-full object-cover"
                            >   </div>

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Nome
                                </h2>

                                <p className="text-zinc-500 text-sm">
                                    Descrição
                                </p>
                            </div>
                        </div>

                        <p className="text-zinc-400 leading-7">
                            Veículos selecionados com procedência,
                            transparência e qualidade para você
                            encontrar o carro ideal.
                        </p>
                    </div>

                    {/* Navegação */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Navegação
                        </h3>

                        <div className="flex flex-col gap-4 text-zinc-400">
                            <a
                                href="#home"
                                className="hover:text-yellow-400 transition flex items-center gap-2"
                            >
                                <ChevronRight size={16} />
                                Início
                            </a>

                            <a
                                href="#about"
                                className="hover:text-yellow-400 transition flex items-center gap-2"
                            >
                                <ChevronRight size={16} />
                                Sobre
                            </a>

                            <a
                                href="#projects"
                                className="hover:text-yellow-400 transition flex items-center gap-2"
                            >
                                <ChevronRight size={16} />
                                Veículos
                            </a>

                            <a
                                href="#contact"
                                className="hover:text-yellow-400 transition flex items-center gap-2"
                            >
                                <ChevronRight size={16} />
                                Contato
                            </a>
                        </div>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Contato
                        </h3>

                        <div className="flex flex-col gap-4 text-zinc-400">

                            <a
                                href="https://wa.me/5527998401662"
                                target="_blank"
                                className="hover:text-yellow-400 transition flex items-center gap-3"
                            >
                                <Phone size={18} />
                                (27) 99840-1662
                            </a>

                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                Aracruz - ES
                            </div>

                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                className="hover:text-yellow-400 transition flex items-center gap-3"
                            >
                                <MessageCircleHeart size={18} />
                                @nomevendedor
                            </a>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-black border border-white/10 rounded-[32px] p-6">
                        <span className="text-yellow-400 text-sm">
                            Atendimento rápido
                        </span>

                        <h3 className="text-2xl font-bold mt-2">
                            Procurando um carro?
                        </h3>

                        <p className="text-zinc-400 mt-3 leading-7">
                            Fale com nossa equipe e encontre
                            o veículo ideal para você.
                        </p>

                        <a
                            href="https://wa.me/5527998401662?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20veículos."
                            target="_blank"
                            className="mt-5 inline-flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full font-semibold hover:scale-105 transition"
                        >
                            Chamar no WhatsApp
                            <Phone size={18} />
                        </a>
                    </div>
                </div>

                {/* linha inferior */}
                <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
                    <p>
                        © 2026 Premium Veículos. Todos os direitos reservados.
                    </p>

                    <p>
                        Desenvolvido por{" "}
                        <span className="text-yellow-400 font-medium">
                            DreyDev
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;