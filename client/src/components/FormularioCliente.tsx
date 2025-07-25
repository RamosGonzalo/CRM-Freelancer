import { useState } from "react";
import clienteService from "../services/clienteService";
import type { Cliente } from "../types/Cliente";

interface Props {
    onClose: () => void;
    onClienteAgregado: () => void;
}

const FormularioCliente = ({ onClose, onClienteAgregado }: Props) => {
    const [form, setForm] = useState<Cliente>({
        nombre: "",
        email: "",
        telefono: "",
        nacionalidad: "",
        dni: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
        await clienteService.crearCliente(form, token);
        onClienteAgregado();
        onClose();
        } catch (error) {
        console.error("Error al crear cliente", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Nuevo Cliente</h2>

            {(Object.keys(form) as (keyof Cliente)[]).map((campo) => (
            <input
                key={campo}
                name={campo}
                type="text"
                placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                value={form[campo] || ""}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            ))}

            <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="text-slate-500 hover:underline">Cancelar</button>
            <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Guardar</button>
            </div>
        </form>
        </div>
    );
};

export default FormularioCliente;
