import { useEffect, useState } from "react";
import type { Tarea } from "../types/Tarea";
import tareaService from "../services/tareaService";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormularioTarea from "../components/FormularioTarea";
import { confirmarEliminacion, alertaExito, alertaError } from "../helpers/alerta";

const Tareas = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [tareaEditar, setTareaEditar] = useState<Tarea | undefined>();
    const navigate = useNavigate()
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const fetchTareas = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const datos = await tareaService.obtenerTareas(token);
            setTareas(datos);
        } catch (error) {
            console.error("Error al obtener tareas", error);
        }
    };

    useEffect(() => {
        fetchTareas();
    }, []);

    const handleEliminar = async (id: string) => {
        const confirmar = await confirmarEliminacion();
        if (!confirmar) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await tareaService.eliminarTarea(id, token);
            alertaExito("Tarea eliminada correctamente");
            fetchTareas();
        } catch (error) {
            console.error("Error al eliminar tarea", error);
            alertaError("Hubo un error al eliminar la tarea");
        }
    };

    return (
        <>
            {mostrarFormulario && (
                <FormularioTarea
                    onClose={() => {
                    setMostrarFormulario(false);
                    setTareaEditar(undefined);
                    }}
                    onTareaAgregada={() => {
                    setMostrarFormulario(false);
                    setTareaEditar(undefined);
                    fetchTareas();
                    }}
                    tarea={tareaEditar}
                />
            )}
            <section className="font-inter px-6 py-10">
                <button
                    onClick={() => navigate("/panel")}
                    className="flex items-center cursor-pointer text-cyan-600 hover:underline mb-6">
                    <FiArrowLeft className="mr-2" />
                    Volver al Panel
                </button>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-slate-800">Mis Tareas</h2>
                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition"
                        >
                        + Nueva Tarea
                    </button>
                </div>

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
                            <td className="p-4">{new Date(tarea.fechaEntrega).toLocaleDateString("es-AR", {
                                timeZone: "UTC"
                                })}
                            </td>
                            <td className="p-4 capitalize">
                                <span className={`px-1 py-1 rounded text-xs font-medium 
                                    ${tarea.estado === "finalizado" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                    {tarea.estado}
                                </span>
                            </td>
                            <td className="p-4">
                                <button 
                                onClick={() => { setTareaEditar(tarea); setMostrarFormulario(true); }}
                                className="text-cyan-600 cursor-pointer hover:underline mr-3">
                                    Editar
                                </button>
                                <button 
                                onClick={() => handleEliminar(tarea._id)}
                                className="text-red-500 cursor-pointer hover:underline">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default Tareas