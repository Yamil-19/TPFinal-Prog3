import express from 'express'
import EmpleadosController from '../../controllers/empleadosController.js'
import UsuariosController from '../../controllers/usuariosController.js'

const empleadosController = new EmpleadosController()
const usuariosController = new UsuariosController()
const router = express.Router()

router.get('/', empleadosController.obtenerTodos)

router.get('/:idUsuario', empleadosController.obtenerPorId)

router.post('/', empleadosController.agregar)

router.patch('/:idUsuario', usuariosController.actualizarPerfil)

export { router }