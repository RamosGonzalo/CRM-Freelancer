import axios from "axios";
import type { Cliente } from "../types/Cliente";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/clientes`;

const clienteService = {
    crearCliente: async (datos: Cliente, token: string) => {
        const res = await axios.post(API_URL, datos, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    obtenerClientes: async (token: string) => {
        const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return res.data;
    },
};

export default clienteService;
