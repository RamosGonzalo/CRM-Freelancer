import { useEffect, useState } from "react";
import clienteService from "../services/clienteService";
import type { Cliente } from "../types/Cliente";
import { alertaExito, alertaError } from "../helpers/alerta";

interface Props {
    onClose: () => void;
    onClienteAgregado: () => void;
    cliente?: Cliente | null;
}

const FormularioCliente = ({ onClose, onClienteAgregado, cliente }: Props) => {
    const [form, setForm] = useState<Cliente>(
        cliente || {
            nombre: "",
            email: "",
            telefono: "",
            nacionalidad: "",
            dni: ""
        }
    );

    useEffect(() => {
        if (cliente) setForm(cliente);
    }, [cliente]);

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
            if (cliente && cliente._id) {
                await clienteService.editarCliente(cliente._id, form, token);
                alertaExito("Cliente editado correctamente");
            } else {
                await clienteService.crearCliente(form, token);
                alertaExito("Cliente creado correctamente");
            }
            onClienteAgregado();
            onClose();
        } catch (error) {
            alertaError("Hubo un error al guardar el cliente");
            console.error("Error al guardar cliente", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
                <h2 className="text-xl font-bold text-slate-800">
                    {cliente ? "Editar Cliente" : "Nuevo Cliente"}
                </h2>

                {(["nombre", "email", "telefono", "nacionalidad", "dni"] as (keyof Cliente)[]).map((campo) => (
                    <div key={campo}>
                        <label htmlFor={campo} className="block mb-1 text-slate-700 font-medium">
                            {campo.charAt(0).toUpperCase() + campo.slice(1)}
                        </label>
                        <input
                            id={campo}
                            name={campo}
                            type="text"
                            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                            value={form[campo] || ""}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}

                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="text-slate-500 cursor-pointer hover:underline">Cancelar</button>
                    <button type="submit" className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCliente;
