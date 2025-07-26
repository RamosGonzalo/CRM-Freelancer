import axios from "axios";
import type { TareaForm, Tarea } from "../types/Tarea";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/tareas`;

const tareaService = {
    obtenerTareas: async (token: string): Promise<Tarea[]> => {
        const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return res.data;
    },

    crearTarea: async (datos: TareaForm, token: string): Promise<Tarea> => {
        const res = await axios.post(API_URL, datos, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return res.data.tarea;
    },

    editarTarea: async (id: string, datos: TareaForm, token: string): Promise<Tarea> => {
    const url = `${API_URL}/${id}`;
    const res = await axios.put(url, datos, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data.tarea;
    },

    eliminarTarea: async (id: string, token: string): Promise<Tarea> => {
        const url = `${API_URL}/${id}`;
        const res = await axios.delete(url,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data.tarea;
    }
};

export default tareaService
