import { Request, Response } from "express";
import { Cliente } from "../models/Cliente";

interface AuthRequest extends Request {
    usuario?: any
}

export const crearCliente = async (req: AuthRequest, res: Response) => {
    try {
        const cliente = new Cliente(req.body)
        cliente.usuario = req.usuario._id
        await cliente.save()

        res.status(201).json({ msg: 'Cliente creado correctamente:', cliente })
    } catch (error) {
        console.error('Error al crear cliente:', error)
        res.status(500).json({ msg: 'Hubo un error al crear el cliente' })
    }
}

export const listarClientes = async (req: AuthRequest, res: Response) => {
    try {
        const clientes = await Cliente.find().where('usuario').equals(req.usuario._id)
        res.status(200).json(clientes)
    } catch (error) {
        console.error('Error al listar clientes:', error)
        res.status(500).json({ msg: 'Hubo un error al obtener los clientes' })
    }
}

export const editarClientes = async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    try {
        // 1. Buscamos el cliente por su ID
        const cliente = await Cliente.findById(id)

        // 2. Verificamos que exista el cliente
        if (!cliente)
        {
            return res.status(404).json({ msg: 'Cliente no encontrado' })
        }

        // 3. Se verifica que el cliente pertenece al usuario logueado
        if (cliente.usuario?.toString() !== req.usuario._id.toString())
        {
            return res.status(401).json({ msg: 'Accion no permitida' })
        }

        // 4. Actualizar los campos (si vienen en el body)
        cliente.nombre = req.body.nombre || cliente.nombre
        cliente.email = req.body.email || cliente.email
        cliente.telefono = req.body.telefono || cliente.telefono
        cliente.nacionalidad = req.body.nacionalidad || cliente.nacionalidad
        cliente.dni = req.body.dni || cliente.dni

        const clienteActualizado = await cliente.save()

        res.json({ msg: 'Cliente actualizado correctamente', cliente: clienteActualizado })
    } catch (error) {
        console.error('Error al editar cliente:', error)
        res.status(500).json({ msg: 'Hubo un error al actualizar el cliente' })
    }
}

export const eliminarClientes = async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    try {
        const cliente = await Cliente.findById(id)

        if (!cliente)
        {
            return res.status(404).json({ msg: 'Cliente no encontrado' })
        }

        if (cliente.usuario?.toString() !== req.usuario._id.toString())
        {
            return res.status(401).json({ msg: 'Acción no permitida' })
        }

        await cliente.deleteOne()

        res.json({ msg: 'Cliente eliminado correctamente' })
    } catch (error) {
        console.error('Error al eliminar cliente:', error)
        res.status(500).json({ msg: 'Hubo un error al eliminar el cliente' })
    }
}