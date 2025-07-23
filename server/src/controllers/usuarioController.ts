import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcryptjs"
import { generarJWT } from "../helpers/generarJWT";

export const registrarUsuario = async (req: Request, res: Response) => {
    const { nombre, email, password } = req.body

    try {
        // Validacion para saber si ya existe el email
        const existeUsuario = await Usuario.findOne({ email })
        if ( existeUsuario ) 
        {
            return res.status(400).json({ msg: 'El usuario ya esta registrado' })
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10)
        const passwordHasheado = await bcrypt.hash(password, salt)

        // Si no existe, se creara y guardara el nuevo usuario con password encriptado
        const nuevoUsuario = new Usuario({ nombre, email, password: passwordHasheado })
        
        await nuevoUsuario.save()

        res.status(201).json({ msg: 'Usuario creado correctamente.' })
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        res.status(500).json({ msg: 'Hubo un error al crear el usuario' })
    }
}

export const autenticarUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email })

        if (!usuario)
        {
            return res.status(404).json({ msg: 'El usuario no existe' })
        }

        const passwordCorrecto = await bcrypt.compare( password, usuario.password)

        if (!passwordCorrecto)
        {
            return res.status(403).json({ msg: 'La contraseña es incorrecta' })
        }

        const token = generarJWT(usuario._id.toString())

        res.status(200).json({
            msg: 'Login exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        })
    } catch (error) {
        console.error('Error al autenticar usuario:', error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}