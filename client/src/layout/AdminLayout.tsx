import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const AdminLayout = () => {
    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setAuth(null)
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-neutral-200 shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold italic">
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
                        Free</span><span className="text-slate-700">Manage</span>
                </h1>
                <div className="flex items-center gap-4">
                    <p className="text-slate-500 text-md">Hola, {auth?.nombre}</p>
                    <button
                        onClick={cerrarSesion}
                        className="text-sm cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout