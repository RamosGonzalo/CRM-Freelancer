import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { conectarBD } from './config/db'
import usuarioRoutes from './routes/usuarioRoutes'
import clienteRoutes from './routes/clienteRoutes'
import tareaRoutes from './routes/tareaRoutes'
import pagoRoutes from './routes/pagoRoutes';

dotenv.config()
conectarBD()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/usuarios', usuarioRoutes) 
app.use('/api/clientes', clienteRoutes)
app.use('/api/tareas', tareaRoutes)
app.use('/api/pagos', pagoRoutes)

app.get('/', (_req, res) => {
    res.send('API del CRM funcionando 💼')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))
