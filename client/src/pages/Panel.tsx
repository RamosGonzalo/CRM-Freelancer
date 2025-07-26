import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteService from "../services/clienteService";
import tareaService from "../services/tareaService";
import type { Tarea } from "../types/Tarea";
import { formatearFecha } from '../helpers/formatearFecha';
import pagoService from "../services/pagoService";
import type { Pago } from "../types/Pago";


const Panel = () => {
    const navigate = useNavigate()
    const [totalClientes, setTotalClientes] = useState(0)
    const [completadas, setCompletadas] = useState(0)
    const [pendientes, setPendientes] = useState(0)
    const [proximas, setProximas] = useState<Tarea[]>([])
    const [totalPagado, setTotalPagado] = useState(0)
    const [ultimos, setUltimos] = useState<Pago[]>([])
    const [monedaSeleccionada, setMonedaSeleccionada] = useState("USD")

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
                const pagosBD = await pagoService.obtenerPagos(token);
                const pagosFiltrados = pagosBD.filter(p => p.estado === "pagado" && p.moneda === monedaSeleccionada);
                const total = pagosFiltrados.reduce((acc, pago) => acc + pago.monto, 0);
                const ultimosPagos = pagosFiltrados.slice(-2).reverse(); // últimos dos pagos recientes
                
                
                
                setCompletadas(completadas);
                setPendientes(pendientes);
                setProximas(proximas);
                setTotalPagado(total);
                setUltimos(ultimosPagos);
            } catch (error) {
                console.error("Error al cargar panel", error)
            }
        };

        obtenerDatos();
    }, [monedaSeleccionada]);

    return (
        <section className="font-inter px-6 py-10 space-y-12">

            <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">Resumen General</h2>
                <p className="text-slate-500">Visión rápida de tu actividad freelance</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Clientes</p>
                    <p className="text-3xl font-bold mt-4 text-cyan-600">{totalClientes}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Tareas completadas</p>
                    <p className="text-3xl font-bold mt-4 text-green-600">{completadas}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center">
                        <p className="text-slate-500 text-sm">Pagos recibidos</p>
                        <select
                            value={monedaSeleccionada}
                            onChange={e => setMonedaSeleccionada(e.target.value)}
                            className="border border-slate-300 text-sm cursor-pointer px-2 py-1 rounded"
                        >
                            <option value="ARS">ARS</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <p className="text-3xl font-bold mt-2 text-blue-600">
                        {totalPagado} {monedaSeleccionada}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-slate-500 text-sm">Tareas pendientes</p>
                    <p className="text-3xl font-bold mt-4 text-orange-500">{pendientes}</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">Próximas tareas</h3>
                <ul className="bg-white rounded-xl shadow divide-y divide-slate-200">
                    {proximas.map(tarea => (
                        <li key={tarea._id} className="p-4 flex justify-between">
                            <span>{tarea.titulo}</span>
                            <span className="text-sm text-slate-500">
                                {formatearFecha(tarea.fechaEntrega)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">Últimos pagos recibidos</h3>
                <ul className="bg-white rounded-xl shadow divide-y divide-slate-200">
                    {ultimos.map(pago => (
                        <li key={pago._id} className="p-4 flex justify-between">
                            <span>{pago.cliente.nombre}</span>
                            <span className="text-blue-600 font-medium">
                                ${pago.monto} {pago.moneda}
                            </span>
                        </li>
                    ))}
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
                    <button
                        onClick={() => navigate("/panel/pagos")}
                        className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        💸 Ver Pagos
                    </button>
                </div>
            </div>



        </section>
    );
};

export default Panel;
