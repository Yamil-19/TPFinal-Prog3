import express from 'express'
import EmpleadosController from '../../controllers/empleadosController.js'

const empleadosController = new EmpleadosController()
const router = express.Router()

router.get('/', empleadosController.obtenerTodos)

router.get('/:idUsuario', empleadosController.obtenerPorId)

router.post('/', empleadosController.agregar)

router.patch('/:idUsuario', empleadosController.modificar)

export { router }