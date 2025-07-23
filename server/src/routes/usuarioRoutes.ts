import express from 'express';
import { registrarUsuario, autenticarUsuario } from '../controllers/usuarioController';

const usuarioRoutes = express.Router()

usuarioRoutes.post('/', registrarUsuario)
usuarioRoutes.post('/login', autenticarUsuario)

export default usuarioRoutes