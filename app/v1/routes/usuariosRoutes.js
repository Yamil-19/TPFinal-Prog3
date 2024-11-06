import express from 'express'
import UsuariosController from '../../controllers/usuariosController.js'

const usuariosController = new UsuariosController()
const router = express.Router()

router.post('/registro', usuariosController.registrar)

router.patch('/actualizar-perfil', usuariosController.actualizarPerfil)

export { router }