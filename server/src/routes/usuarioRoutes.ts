import express from 'express';
import { registrarUsuario, autenticarUsuario, cambiarPassword, actualizarPerfil } from '../controllers/usuarioController';
import { checkAuth } from '../middleware/checkAuth';

const usuarioRoutes = express.Router()

usuarioRoutes.post('/', registrarUsuario)
usuarioRoutes.post('/login', autenticarUsuario)
usuarioRoutes.put('/cambiar-password', checkAuth, cambiarPassword)
usuarioRoutes.put('/perfil', checkAuth, actualizarPerfil)

export default usuarioRoutes