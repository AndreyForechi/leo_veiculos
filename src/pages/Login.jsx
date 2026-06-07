import { useState } from "react";
import { supabase } from "/services/supabase";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert(
                "Preencha email e senha"
            );
            return;
        }

        try {
            setLoading(true);

            const { error } =
                await supabase.auth.signInWithPassword(
                    {
                        email,
                        password,
                    }
                );

            if (error) throw error;

            navigate("/admin");
        } catch (error) {
            alert(
                "Email ou senha inválidos"
            );

            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-white text-3xl font-bold">
                        Painel Admin
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Faça login para acessar
                    </p>
                </div>

                <div className="space-y-5">

                    <div>
                        <label className="text-zinc-400 text-sm block mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white outline-none focus:border-zinc-600 transition"
                            placeholder="Digite seu email"
                        />
                    </div>

                    <div>
                        <label className="text-zinc-400 text-sm block mb-2">
                            Senha
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white outline-none focus:border-zinc-600 transition"
                            placeholder="Digite sua senha"
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full bg-white text-black font-semibold py-4 rounded-2xl hover:opacity-90 transition"
                >
                    {loading
                        ? "Entrando..."
                        : "Entrar"}
                </button>
            </form>
        </div>
    );
}

export default Login;