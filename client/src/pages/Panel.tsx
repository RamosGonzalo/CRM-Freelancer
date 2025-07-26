import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteService from "../services/clienteService";
import tareaService from "../services/tareaService";
import type { Tarea } from "../types/Tarea";

const Panel = () => {
    const navigate = useNavigate()
    const [totalClientes, setTotalClientes] = useState(0)
    const [completadas, setCompletadas] = useState(0);
    const [pendientes, setPendientes] = useState(0);
    const [proximas, setProximas] = useState<Tarea[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const obtenerDatos = async () => {
            try {
                const clientes = await clienteService.obtenerClientes(token);
                setTotalClientes(clientes.length);

                const tareasBD = await tareaService.obtenerTareas(token);

                const completadas = tareasBD.filter(t => t.estado === "finalizado").length;
                const pendientes = tareasBD.filter(t => t.estado === "pendiente").length;
                const proximas = tareasBD
                    .filter(t => t.estado === "pendiente")
                    .sort((a, b) => new Date(a.fechaEntrega).getTime() - new Date(b.fechaEntrega).getTime())
                    .slice(0, 2);

                setCompletadas(completadas);
                setPendientes(pendientes);
                setProximas(proximas);
            } catch (error) {
                console.error("Error al cargar panel", error)
            }
        };

        obtenerDatos();
    }, []);

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
                    <p className="text-3xl font-bold text-green-600">{completadas}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Pagos recibidos</p>
                    <p className="text-3xl font-bold text-blue-600">$1.200</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Tareas pendientes</p>
                    <p className="text-3xl font-bold text-orange-500">{pendientes}</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">Próximas tareas</h3>
                <ul className="bg-white rounded-xl shadow divide-y divide-slate-200">
                    {proximas.map(tarea => (
                        <li key={tarea._id} className="p-4 flex justify-between">
                            <span>{tarea.titulo}</span>
                            <span className="text-sm text-slate-500">
                                {new Date(tarea.fechaEntrega).toLocaleDateString("es-AR", { timeZone: "UTC" })}
                            </span>
                        </li>
                    ))}
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
                    <button 
                        onClick={() => navigate("/panel/tareas")}
                        className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        ✅ Ver Tareas
                    </button>
                    <button className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        💸 Ver Pagos
                    </button>
                </div>
            </div>



        </section>
    );
};

export default Panel;
