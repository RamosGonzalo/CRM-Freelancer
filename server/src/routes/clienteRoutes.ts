import express from "express";
import { crearCliente, editarClientes, eliminarClientes, listarClientes } from "../controllers/clienteController";
import { checkAuth } from "../middleware/checkAuth";

const clienteRoutes = express.Router()

// Ruta protegida :)
clienteRoutes.post('/', checkAuth, crearCliente)
clienteRoutes.get('/', checkAuth, listarClientes)
clienteRoutes.put('/:id', checkAuth, editarClientes)
clienteRoutes.delete('/:id', checkAuth, eliminarClientes)

export default clienteRoutes