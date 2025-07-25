import { Request, Response } from "express";
import { Pago } from "../models/Pago";

interface AuthRequest extends Request {
    usuario?: any
}

export const crearPago = async (req: AuthRequest, res: Response) => {
    try {
        const pago = new Pago(req.body)
        pago.usuario = req.usuario._id
        await pago.save()

        res.status(201).json({ msg: "Pago registrado correctamente", pago })
    } catch (error) {
        console.error("Error al crear pago:", error);
        res.status(500).json({ msg: "Hubo un error al registrar el pago" })
    }
};

export const listarPagos = async (req: AuthRequest, res: Response) => {
    try {
        const pagos = await Pago.find()
        .where("usuario")
        .equals(req.usuario._id)
        .populate("cliente", "nombre")

        res.status(200).json(pagos)
    } catch (error) {
        console.error("Error al listar pagos:", error)
        res.status(500).json({ msg: "Hubo un error al obtener los pagos" })
    }
};

export const editarPago = async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    try {
        const pago = await Pago.findById(id)

        if (!pago) {
        return res.status(404).json({ msg: "Pago no encontrado" })
        }

        if (pago.usuario.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({ msg: "Acción no permitida" })
        }

        pago.monto = req.body.monto || pago.monto
        pago.moneda = req.body.moneda || pago.moneda
        pago.estado = req.body.estado || pago.estado
        pago.cliente = req.body.cliente || pago.cliente

        const pagoActualizado = await pago.save()

        res.json({ msg: "Pago actualizado correctamente", pago: pagoActualizado })
    } catch (error) {
        console.error("Error al editar pago:", error);
        res.status(500).json({ msg: "Hubo un error al actualizar el pago" })
    }
};

export const eliminarPago = async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    try {
        const pago = await Pago.findById(id)

        if (!pago) {
        return res.status(404).json({ msg: "Pago no encontrado" })
        }

        if (pago.usuario.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({ msg: "Acción no permitida" })
        }

        await pago.deleteOne()

        res.json({ msg: "Pago eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar pago:", error);
        res.status(500).json({ msg: "Hubo un error al eliminar el pago" })
    }
};
