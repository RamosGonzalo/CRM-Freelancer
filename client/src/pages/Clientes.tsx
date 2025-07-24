import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import clienteService from "../services/clienteService";

interface Cliente {
    _id: string;
    nombre: string;
    email: string;
    telefono: string;
}

const Clientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const obtenerClientes = async () => {
        try {
            const datos = await clienteService.obtenerClientes(token);
            setClientes(datos);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
        };

        obtenerClientes();
    }, []);

    return (
        <section className="font-inter px-6 py-10">
        <button
            onClick={() => navigate("/panel")}
            className="flex items-center cursor-pointer text-cyan-600 hover:underline mb-6"
        >
            <FiArrowLeft className="mr-2" />
            Volver al Panel
        </button>

        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">Mis Clientes</h2>
            <button className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-cyan-700 transition">
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
                <th className="p-4">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
                {clientes.map((cliente) => (
                <tr key={cliente._id} className="border-t">
                    <td className="p-4">{cliente.nombre}</td>
                    <td className="p-4">{cliente.email}</td>
                    <td className="p-4">{cliente.telefono}</td>
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
};

export default Clientes;
