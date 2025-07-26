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
        return res.data
    },
    obtenerClientes: async (token: string) => {
        const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return res.data;
    },
    editarCliente: async (id: string, datos: Cliente, token: string) => {
        const url = `${API_URL}/${id}`
        const res = await axios.put(url, datos, {
            headers: {
            Authorization: `Bearer ${token}`,
            }
        });
        return res.data;
    },
    eliminarCliente: async (id: string, token: string) => {
        const url = `${API_URL}/${id}`;
        await axios.delete(url, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default clienteService;
