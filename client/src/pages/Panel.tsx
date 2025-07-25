import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteService from "../services/clienteService";


const Panel = () => {
    const navigate = useNavigate()
    const [totalClientes, setTotalClientes] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const obtenerClientes = async () => {
            try {
                const clientes = await clienteService.obtenerClientes(token);
                setTotalClientes(clientes.length);
            } catch (error) {
                console.error("Error al cargar total de clientes", error)
            }
        }

        obtenerClientes();
    }, [])

    return (
        <section className="font-inter px-6 py-10 space-y-12">

            <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">Resumen General</h2>
                <p className="text-slate-500">Visión rápida de tu actividad freelance</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Clientes</p>
                    <p className="text-3xl font-bold text-cyan-600">{totalClientes}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Tareas completadas</p>
                    <p className="text-3xl font-bold text-green-600">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Pagos recibidos</p>
                    <p className="text-3xl font-bold text-blue-600">$1.200</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Tareas pendientes</p>
                    <p className="text-3xl font-bold text-orange-500">4</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">Próximas tareas</h3>
                <ul className="bg-white rounded-xl shadow divide-y divide-slate-200">
                    <li className="p-4 flex justify-between">
                        <span>Actualizar portfolio para Cliente A</span>
                        <span className="text-sm text-slate-500">Hoy</span>
                    </li>
                    <li className="p-4 flex justify-between">
                        <span>Enviar factura a Cliente B</span>
                        <span className="text-sm text-slate-500">Mañana</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">Últimos pagos recibidos</h3>
                <ul className="bg-white rounded-xl shadow divide-y divide-slate-200">
                    <li className="p-4 flex justify-between">
                        <span>Cliente C</span>
                        <span className="text-blue-600 font-medium">$500</span>
                    </li>
                    <li className="p-4 flex justify-between">
                        <span>Cliente D</span>
                        <span className="text-blue-600 font-medium">$700</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">Accesos rápidos</h3>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => navigate("/panel/clientes")}
                        className="bg-cyan-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                    >
                        👥 Ver Clientes
                    </button>
                    <button className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        ✅ Nueva Tarea
                    </button>
                    <button className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        💸 Registrar Pago
                    </button>
                </div>
            </div>



        </section>
    );
};

export default Panel;
