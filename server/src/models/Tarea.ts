import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            trim: true
        },
        estado: {
            type: String,
            enum: ["pendiente", "finalizado"],
            default: "pendiente"
        },
        fechaEntrega: {
            type: Date
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cliente",
            required: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Tarea = mongoose.model("Tarea", tareaSchema);