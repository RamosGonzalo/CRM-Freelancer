import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Perfil = () => {
    const navigate = useNavigate();

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
                <button
                    onClick={() => navigate("/panel/perfil/editar")}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Editar mis datos
                </button>
                <button
                    onClick={() => navigate("/panel/perfil/cambiar-password")}
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                    Cambiar contraseña
                </button>
            </div>
        </section>
    );
};

export default Perfil;
