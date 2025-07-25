import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import clienteService from "../services/clienteService";
import type { Cliente } from "../types/Cliente";
import FormularioCliente from "../components/FormularioCliente";
import { confirmarEliminacion, alertaExito, alertaError } from "../helpers/alerta";

const Clientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [clienteEditar, setClienteEditar] = useState<Cliente | null>(null);


    const obtenerClientes = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const datos = await clienteService.obtenerClientes(token);
            setClientes(datos);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    };

    const handleEliminar = async (id: string) => {
        const confirmar = await confirmarEliminacion();
        if (!confirmar) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await clienteService.eliminarCliente(id, token);
            alertaExito("Cliente eliminado correctamente");
            obtenerClientes();
        } catch {
            alertaError("Hubo un error al eliminar el cliente");
        }
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    return (
        <>
            {mostrarFormulario && (
            <FormularioCliente
                onClose={() => {
                setMostrarFormulario(false);
                setClienteEditar(null);
                }}
                onClienteAgregado={obtenerClientes}
                cliente={clienteEditar}
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
                    <h2 className="text-2xl font-semibold text-slate-800">Mis Clientes</h2>
                    <button onClick={() => setMostrarFormulario(true)} className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition">
                    + Nuevo Cliente
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-xl shadow-sm">
                    <thead className="bg-slate-100 text-left text-slate-600 text-sm uppercase">
                        <tr>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Teléfono</th>
                        <th className="p-4">Nacionalidad</th>
                        <th className="p-4">DNI</th>
                        <th className="p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700 text-sm">
                        {clientes.map((cliente) => (
                            <tr key={cliente._id} className="border-t">
                            <td className="p-4">{cliente.nombre}</td>
                            <td className="p-4">{cliente.email}</td>
                            <td className="p-4">{cliente.telefono}</td>
                            <td className="p-4">{cliente.nacionalidad}</td>
                            <td className="p-4">{cliente.dni}</td>
                            <td className="p-4">
                                <button onClick={() => {
                                    setClienteEditar(cliente);
                                    setMostrarFormulario(true);}} 
                                    className="text-cyan-600 cursor-pointer hover:underline mr-3">Editar</button>
                                <button onClick={() => handleEliminar(cliente._id!)} 
                                className="text-red-500 cursor-pointer hover:underline">Eliminar</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Clientes;
