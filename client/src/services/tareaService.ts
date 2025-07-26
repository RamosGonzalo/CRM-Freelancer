import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/tareas`;

const tareaService = {
    obtenerTareas: async (token: string) => {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }
};

export default tareaService;
