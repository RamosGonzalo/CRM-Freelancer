import axios from "axios";
import type { Pago, PagoForm } from "../types/Pago";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/pagos`;

const pagoService = {
    obtenerPagos: async (token: string): Promise<Pago[]> => {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },

    crearPago: async (datos: PagoForm, token: string): Promise<Pago> => {
        const res = await axios.post(API_URL, datos, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.pago;
    },

    editarPago: async (id: string, datos: PagoForm, token: string): Promise<Pago> => {
        const url = `${API_URL}/${id}`;
        const res = await axios.put(url, datos, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.pago;
    },

    eliminarPago: async (id: string, token: string): Promise<Pago> => {
        const url = `${API_URL}/${id}`;
        const res = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.pago;
    },
};

export default pagoService
