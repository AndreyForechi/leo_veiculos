import { supabase } from "/services/supabase";
import { useNavigate } from "react-router-dom"

export function NavAdmin() {
    const navigate = useNavigate();

    async function handleLogout() {
        await supabase.auth.signOut();

        navigate("/login");
    }
    return (
        <header className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 w-full sm:flex justify-between text items-center sm:text-start">
                <h1 className="text-2xl font-bold text-white">Administrador</h1>
                <nav className="flex gap-8 sm:justify-end text-zinc-300">
                    <a href="#painel" className="hover:text-white transition">
                        Painel
                    </a>
                    <a href="#veiculos" className="hover:text-white transition">
                        Veículos
                    </a>
                    <a className="hover:text-white transition cursor-pointer" onClick={handleLogout}>
                        Sair
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default NavAdmin