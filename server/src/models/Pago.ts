import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema(
    {
        monto: {
        type: Number,
        required: true
        },
        moneda: {
        type: String,
        enum: ["ARS", "USD", "EUR"],
        default: "ARS"
        },
        estado: {
        type: String,
        enum: ["pendiente", "pagado"],
        default: "pendiente"
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
);

export const Pago = mongoose.model("Pago", pagoSchema);
