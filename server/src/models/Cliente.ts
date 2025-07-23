import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        telefono: {
            type: String,
            required: true,
        },
        nacionalidad: {
            type: String,
            required: true,
            trim: true
        },
        dni: {
            type: String,
            required: true,
            trim: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    }
)

export const Cliente = mongoose.model('Cliente', clienteSchema)