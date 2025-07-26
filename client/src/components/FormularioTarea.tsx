import { useEffect, useState } from "react";
import clienteService from "../services/clienteService";
import tareaService from "../services/tareaService";
import type { Cliente } from "../types/Cliente";
import type { Tarea, TareaForm } from "../types/Tarea";
import { alertaError, alertaExito } from "../helpers/alerta";

interface Props {
    onClose: () => void;
    onTareaAgregada: () => void;
    tarea?: Tarea;
}

const FormularioTarea = ({ onClose, onTareaAgregada, tarea }: Props) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [form, setForm] = useState<TareaForm>({
        titulo: tarea?.titulo || "",
        descripcion: tarea?.descripcion || "",
        fechaEntrega: tarea?.fechaEntrega?.slice(0, 10) || "",
        estado: tarea?.estado || "pendiente",
        cliente: tarea?.cliente?._id || ""
    });



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchClientes = async () => {
        try {
            const data = await clienteService.obtenerClientes(token);
            setClientes(data);
        } catch (error) {
            console.error("Error al obtener clientes", error);
        }
        };

        fetchClientes();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;
        const hoy = new Date().toISOString().slice(0, 10);
        if (form.fechaEntrega < hoy) {
            alertaError("La fecha de entrega no puede ser anterior a hoy.");
            return;
        }

        try {
        if (tarea && tarea._id) {
            await tareaService.editarTarea(tarea._id, form, token);
            alertaExito("Tarea editada correctamente");
            } else {
            await tareaService.crearTarea(form, token);
            alertaExito("Tarea creada correctamente");
        }

        onTareaAgregada();
        onClose();
        } catch (error) {
        console.error("Error al crear tarea", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Nueva Tarea</h2>

            <div>
            <label htmlFor="titulo" className="block text-slate-700 mb-1 font-medium">Título</label>
            <input
                type="text"
                id="titulo"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            </div>

            <div>
            <label htmlFor="descripcion" className="block text-slate-700 mb-1 font-medium">Descripción</label>
            <textarea
                id="descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            </div>

            <div>
            <label htmlFor="fechaEntrega" className="block text-slate-700 mb-1 font-medium">Fecha de Entrega</label>
            <input
                type="date"
                id="fechaEntrega"
                name="fechaEntrega"
                value={form.fechaEntrega}
                min={new Date().toISOString().slice(0, 10)}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            </div>

            <div>
            <label htmlFor="cliente" className="block text-slate-700 mb-1 font-medium">Cliente</label>
            <select
                id="cliente"
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            >
                <option value="">-- Seleccionar --</option>
                {clientes.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                    {cliente.nombre}
                </option>
                ))}
            </select>
            </div>

            <div>
                <label htmlFor="estado" className="block text-slate-700 mb-1 font-medium">Estado</label>
                <select
                    id="estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="finalizado">Completada</option>
                </select>
            </div>

            <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="text-slate-500 cursor-pointer hover:underline">Cancelar</button>
            <button type="submit" className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition">
                Guardar
            </button>
            </div>
        </form>
        </div>
    );
};

export default FormularioTarea;
