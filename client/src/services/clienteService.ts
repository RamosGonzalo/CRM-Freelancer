import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/clientes`;

const clienteService = {
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
