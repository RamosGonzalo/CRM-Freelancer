import { useState } from "react"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"

const Registro = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if ([nombre, email, password].some(campo => campo.trim() === "")) {
            setError("Todos los campos son obligatorios.")
            return
        }

        try {
            const { data } = await clienteAxios.post("/usuarios", {
                nombre,
                email,
                password
            })

            setError("")
            setMensaje(data.msg)
            setTimeout(() => navigate("/"), 1500)
        } catch (error) {
            const err = error as AxiosError<{ msg: string }>
            const msg = err.response?.data?.msg || "Ocurrió un error."
            setError(msg)
        }
    }

    return (
        <section className="font-inter">
            <h1 className="text-center text-3xl font-bold text-slate-800 mb-2">Regístrate</h1>
            <p className="text-center text-sm text-slate-500 mb-6">Crea una cuenta en FreeManage</p>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm"
            >
                {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center border border-red-100">{error}</div>}
                {mensaje && <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4 text-center border border-green-100">{mensaje}</div>}

                {/* Nombre */}
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Contraseña */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white cursor-pointer py-2.5 rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all shadow-md"
                >
                    Crear cuenta
                </button>

                <p className="text-sm text-center text-slate-500 mt-6">
                    ¿Ya tienes cuenta? <a href="/" className="text-cyan-600 font-semibold hover:text-cyan-800 transition-colors">Inicia sesión</a>
                </p>
            </form>
        </section>
    )
}

export default Registro
