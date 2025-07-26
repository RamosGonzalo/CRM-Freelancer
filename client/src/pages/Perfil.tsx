import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Perfil = () => {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)

    return (
        <section className="font-inter px-6 py-10 space-y-6">
            <button
                onClick={() => navigate("/panel")}
                className="flex items-center cursor-pointer text-cyan-600 hover:underline"
            >
                <FiArrowLeft className="mr-2" />
                Volver al Panel
            </button>

            <h2 className="text-2xl font-semibold text-slate-800">Mi Perfil</h2>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div>
                    <p className="text-slate-600 text-sm">Nombre</p>
                    <p className="text-slate-800 font-medium">{auth?.nombre}</p>
                </div>
                <div>
                    <p className="text-slate-600 text-sm">Email</p>
                    <p className="text-slate-800 font-medium">{auth?.email}</p>
                </div>

                <div className="pt-4 space-y-3">
                    <button
                        onClick={() => navigate("/panel/perfil/editar")}
                        className="w-full bg-cyan-600 text-white cursor-pointer py-2 rounded hover:bg-cyan-700 transition"
                    >
                        Editar mis datos
                    </button>
                    <button
                        onClick={() => navigate("/panel/perfil/cambiar-password")}
                        className="w-full bg-gray-600 text-white cursor-pointer py-2 rounded hover:bg-gray-700 transition"
                    >
                        Cambiar contraseña
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Perfil;
