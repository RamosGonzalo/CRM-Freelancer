import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { alertaError, alertaExito } from "../helpers/alerta";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const EditarPerfil = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [form, setForm] = useState({ nombre: "", email: "" });

    useEffect(() => {
        if (auth) {
            setForm({ nombre: auth.nombre, email: auth.email });
        }
    }, [auth]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAuth(data.usuarioActualizado);
            alertaExito("Perfil actualizado correctamente");
            navigate("/panel/perfil");
        } catch (error) {
            console.error("Error al actualizar perfil", error);
            alertaError("No se pudo actualizar el perfil");
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

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Editar Perfil</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div>
                    <label className="block text-slate-700 font-medium mb-1" htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-slate-700 font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditarPerfil;
