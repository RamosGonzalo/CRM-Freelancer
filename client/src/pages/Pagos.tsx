import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import type { Pago } from "../types/Pago";
import pagoService from "../services/pagoService";
import FormularioPago from "../components/FormularioPago";
import { alertaError, alertaExito, confirmarEliminacion } from "../helpers/alerta";

const Pagos = () => {
    const navigate = useNavigate();
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [pagoEditar, setPagoEditar] = useState<Pago | undefined>();

    const fetchPagos = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const data = await pagoService.obtenerPagos(token);
            setPagos(data);
        } catch (error) {
            console.error("Error al obtener pagos", error);
        }
    };

    useEffect(() => {
        fetchPagos();
    }, []);

    const handleEliminar = async (pago: Pago) => {
    const confirmar = await confirmarEliminacion();
    if (!confirmar) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        await pagoService.eliminarPago(pago._id, token);
        alertaExito("Pago eliminado correctamente");
        fetchPagos();
    } catch (error) {
        console.error("Error al eliminar pago", error);
        alertaError("Hubo un error al eliminar el pago");
    }
}

    return (
        <>
            {mostrarFormulario && (
                <FormularioPago
                    onClose={() => {
                        setMostrarFormulario(false);
                        setPagoEditar(undefined);
                    }}
                    onPagoGuardado={fetchPagos}
                    pago={pagoEditar}
                />
            )}

            <section className="font-inter px-6 py-10">
                <button
                    onClick={() => navigate("/panel")}
                    className="flex items-center cursor-pointer text-cyan-600 hover:underline mb-6"
                >
                    <FiArrowLeft className="mr-2" />
                    Volver al Panel
                </button>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-slate-800">Pagos</h2>
                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        + Nuevo Pago
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-xl shadow-sm">
                        <thead className="bg-slate-100 text-left text-slate-600 text-sm uppercase">
                            <tr>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Monto</th>
                                <th className="p-4">Moneda</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 text-sm">
                            {pagos.map(pago => (
                                <tr key={pago.cliente._id + pago.monto} className="border-t">
                                    <td className="p-4">{pago.cliente.nombre}</td>
                                    <td className="p-4">${pago.monto}</td>
                                    <td className="p-4">{pago.moneda}</td>
                                    <td className="p-4 capitalize">
                                        <span className={`px-1 py-1 rounded text-xs font-medium 
                                            ${pago.estado === "pagado" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            {pago.estado}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => {
                                                setPagoEditar(pago);
                                                setMostrarFormulario(true);
                                            }}
                                            className="text-cyan-600 cursor-pointer hover:underline mr-3"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(pago)}
                                            className="text-red-500 cursor-pointer hover:underline"
                                        >
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
};

export default Pagos;
