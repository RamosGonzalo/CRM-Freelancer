import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "")
        {
            setError("Todos los campos son obligatorios.")
            return
        }

        setError("")
        console.log("Iniciar sesión con:", { email, password });

        // Llamada a la API con fetch o axios
    }

    return (
        <section>
            <h1 className="text-center text-3xl font-bold mt-5">Login</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-8 mt-8 bg-white rounded-lg"
            >
                {/* Mensaje de error */}
                {error && (
                <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center font-medium">
                    {error}
                </div>
                )}

                {/* Email */}
                <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                {/* Contraseña */}
                <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 pt-6"
                >
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 my-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Iniciar sesión
                </button>
                </div>

                <p className="text-sm text-center text-gray-500">
                ¿No tienes cuenta?{" "}
                <a
                    href="/registro"
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-all"
                >
                    Registrate
                </a>
                </p>
            </form>
        </section>
    )
}

export default Login