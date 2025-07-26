import { useEffect, useState } from "react";
import clienteService from "../services/clienteService";
import pagoService from "../services/pagoService";
import type { Cliente } from "../types/Cliente";
import type { Pago, PagoForm } from "../types/Pago";
import { alertaError, alertaExito } from "../helpers/alerta";

interface Props {
    onClose: () => void;
    onPagoGuardado: () => void;
    pago?: Pago;
}

const FormularioPago = ({ onClose, onPagoGuardado, pago }: Props) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [form, setForm] = useState<PagoForm>({
        monto: pago?.monto || 0,
        moneda: pago?.moneda || "ARS",
        estado: pago?.estado || "pendiente",
        cliente: pago?.cliente._id || "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const obtenerClientes = async () => {
            try {
                const data = await clienteService.obtenerClientes(token);
                setClientes(data);
            } catch (error) {
                console.error("Error al obtener clientes", error);
            }
        };

        obtenerClientes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!form.monto || form.monto <= 0) {
            alertaError("El monto debe ser mayor a cero.");
            return;
        }

        try {
            if (pago && pago._id) {
                await pagoService.editarPago(pago._id, form, token);
                alertaExito("Pago editado correctamente");
            } else {
                await pagoService.crearPago(form, token);
                alertaExito("Pago registrado correctamente");
            }

            onPagoGuardado();
            onClose();
        } catch (error) {
            console.error("Error al guardar pago", error);
            alertaError("No se pudo guardar el pago.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
                <h2 className="text-xl font-bold text-slate-800">{pago ? "Editar Pago" : "Nuevo Pago"}</h2>

                <div>
                    <label htmlFor="monto" className="block text-slate-700 mb-1 font-medium">Monto</label>
                    <input
                        type="number"
                        id="monto"
                        name="monto"
                        value={form.monto}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                        min={1}
                    />
                </div>

                <div>
                    <label htmlFor="moneda" className="block text-slate-700 mb-1 font-medium">Moneda</label>
                    <select
                        id="moneda"
                        name="moneda"
                        value={form.moneda}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="ARS">ARS</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="estado" className="block text-slate-700 mb-1 font-medium">Estado</label>
                    <select
                        id="estado"
                        name="estado"
                        value={form.estado}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="pagado">Pagado</option>
                    </select>
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

                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="text-slate-500 cursor-pointer hover:underline">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioPago;
