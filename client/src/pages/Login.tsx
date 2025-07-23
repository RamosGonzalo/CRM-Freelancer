import { useState } from "react";
import { AxiosError } from "axios";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const { data } = await clienteAxios.post<{
                token: string;
                usuario: {
                    id: string;
                    nombre: string;
                    email: string;
                };
            }>("/usuarios/login", {
                email,
                password,
            });

            setError("");
            localStorage.setItem("token", data.token);
            navigate("/panel");
        } catch (error) {
            const err = error as AxiosError<{ msg: string }>;
            const msg = err.response?.data?.msg || "Ocurrió un error.";
            setError(msg);
        }
    };

    return (
        <section className="font-inter">
            <h1 className="text-center text-3xl font-bold text-slate-800 mb-2">
                Iniciar Sesión
            </h1>
            <p className="text-center text-sm text-slate-500 mb-6">
                Gestiona tus proyectos freelancer
            </p>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm"
            >
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center border border-red-100">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="ejemplo@correo.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Contraseña */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700 mb-1"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-2.5 rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all shadow-md cursor-pointer"
                >
                    Iniciar sesión
                </button>

                <p className="text-sm text-center text-slate-500 mt-6">
                    ¿No tienes cuenta? <a href="/registro" className="text-cyan-600 font-semibold hover:text-cyan-800 transition-colors">Regístrate</a>
                </p>
            </form>
        </section>
    );
};

export default Login;