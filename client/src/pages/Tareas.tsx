import { useEffect, useState } from "react";
import type { Tarea } from "../types/Tarea";
import tareaService from "../services/tareaService";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Tareas = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchTareas = async () => {
        try {
            const datos = await tareaService.obtenerTareas(token);
            setTareas(datos);
        } catch (error) {
            console.error("Error al obtener tareas", error);
        }
        };

        fetchTareas();
    }, []);

    return (
        <section className="font-inter px-6 py-10">
            <button
                onClick={() => navigate("/panel")}
                className="flex items-center cursor-pointer text-cyan-600 hover:underline mb-6">
                <FiArrowLeft className="mr-2" />
                Volver al Panel
            </button>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Mis Tareas</h2>

            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow-sm">
                <thead className="bg-slate-100 text-left text-slate-600 text-sm uppercase">
                    <tr>
                    <th className="p-4">Título</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Descripción</th>
                    <th className="p-4">Fecha entrega</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-slate-700 text-sm">
                    {tareas.map((tarea) => (
                    <tr key={tarea._id} className="border-t">
                        <td className="p-4">{tarea.titulo}</td>
                        <td className="p-4">{tarea.cliente?.nombre}</td>
                        <td className="p-4">{tarea.descripcion}</td>
                        <td className="p-4">{new Date(tarea.fechaEntrega).toLocaleDateString()}</td>
                        <td className="p-4 capitalize">{tarea.estado}</td>
                        <td className="p-4">
                        <button className="text-cyan-600 cursor-pointer hover:underline mr-3">Editar</button>
                        <button className="text-red-500 cursor-pointer hover:underline">Eliminar</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </section>
    );
}

export default Tareas