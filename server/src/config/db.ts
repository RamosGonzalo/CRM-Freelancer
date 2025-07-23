import mongoose from "mongoose";

export const conectarBD = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI!)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en ${url}`)
    } catch (error) {
        console.log('Error al conectar a MongoDB:', error)
        process.exit(1)
    }
}