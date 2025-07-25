import { Request, Response } from "express";
import { Tarea } from "../models/Tarea";

interface AuthRequest extends Request {
    usuario?: any;
}

export const crearTarea = async (req: AuthRequest, res: Response) => {
    try {
        const tarea = new Tarea(req.body);
        tarea.usuario = req.usuario._id
        await tarea.save();

        res.status(201).json({ msg: "Tarea creada correctamente", tarea });
    } catch (error) {
        console.error("Error al crear tarea:", error);
        res.status(500).json({ msg: "Hubo un error al crear la tarea" });
    }
}

export const listarTareas = async (req: AuthRequest, res: Response) => {
    try {
        const tareas = await Tarea.find()
        .where("usuario")
        .equals(req.usuario._id)
        .populate("cliente", "nombre");

        res.status(200).json(tareas);
    } catch (error) {
        console.error("Error al listar tareas:", error);
        res.status(500).json({ msg: "Hubo un error al obtener las tareas" });
    }
};

export const editarTarea = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const tarea = await Tarea.findById(id);

        if (!tarea) {
        return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        if (tarea.usuario.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({ msg: "Acción no permitida" });
        }

        tarea.titulo = req.body.titulo || tarea.titulo;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.estado = req.body.estado || tarea.estado;
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
        tarea.cliente = req.body.cliente || tarea.cliente;

        const tareaActualizada = await tarea.save();

        res.json({ msg: "Tarea actualizada correctamente", tarea: tareaActualizada });
    } catch (error) {
        console.error("Error al editar tarea:", error);
        res.status(500).json({ msg: "Hubo un error al actualizar la tarea" });
    }
};

export const eliminarTarea = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const tarea = await Tarea.findById(id);

        if (!tarea) {
        return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        if (tarea.usuario.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({ msg: "Acción no permitida" });
        }

        await tarea.deleteOne();

        res.json({ msg: "Tarea eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).json({ msg: "Hubo un error al eliminar la tarea" });
    }
};