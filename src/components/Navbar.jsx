import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <a onClick={() => navigate("/")}>
                <img
                    src="/logo_leo.jpg"
                    alt="Logo"
                    className="w-13 h-13 cursor-pointer rounded-full bg-white text-black text-sm flex items-center justify-center font-bold"></img>
                <div />
            </a>

            <nav className="flex gap-8 text-sm text-zinc-300">
                <a href="#about" className="hover:text-white transition">
                    Sobre
                </a>
                <a href="#projects" className="hover:text-white transition">
                    Veículos
                </a>
                <a href="#contact" className="hover:text-white transition">
                    Contato
                </a>
            </nav>
        </div>
        </header >
    )
}

export default Navbar