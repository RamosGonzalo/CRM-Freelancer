import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Usuario } from '../models/Usuario';

interface AuthRequest extends Request {
    usuario?: any
}

export const checkAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Token no valido o inexistente' })
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

        const usuario = await Usuario.findById(decoded.id).select('-password')
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }

        req.usuario = usuario
        next()
    } catch (error) {
        console.error('Error en el middleware de auth:', error)
        return res.status(401).json({ msg: 'Token invalido' })
    }
}