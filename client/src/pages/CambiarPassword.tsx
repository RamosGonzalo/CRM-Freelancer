import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { alertaError, alertaExito, confirmarCambiarPassword } from "../helpers/alerta";
import { FiArrowLeft } from "react-icons/fi";

const CambiarPassword = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        passwordActual: "",
        passwordNuevo: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.passwordNuevo.length < 6) {
            alertaError("La nueva contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (form.passwordNuevo === form.passwordActual) {
            alertaError("La nueva contraseña debe ser diferente a la actual");
            return;
        }

        const confirmar = await confirmarCambiarPassword()

        if (!confirmar) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/cambiar-password`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alertaExito(data.msg);
            navigate("/panel/perfil");
        } catch (error) {
            const err = error as AxiosError<{ msg: string }>;
            console.error("Error al cambiar contraseña", err);
            alertaError(err.response?.data?.msg || "No se pudo cambiar la contraseña");
        }
    };

    return (
        <section className="font-inter px-6 py-10 max-w-xl mx-auto">
            <button
                onClick={() => navigate("/panel/perfil")}
                className="flex items-center cursor-pointer text-cyan-600 hover:underline mb-6"
            >
                <FiArrowLeft className="mr-2" />
                Volver
            </button>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cambiar Contraseña</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div>
                    <label className="block text-slate-700 font-medium mb-1" htmlFor="passwordActual">
                        Contraseña actual
                    </label>
                    <input
                        type="password"
                        name="passwordActual"
                        id="passwordActual"
                        value={form.passwordActual}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-slate-700 font-medium mb-1" htmlFor="passwordNuevo">
                        Nueva contraseña
                    </label>
                    <input
                        type="password"
                        name="passwordNuevo"
                        id="passwordNuevo"
                        value={form.passwordNuevo}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-orange-600 transition"
                    >
                        Actualizar contraseña
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CambiarPassword;
