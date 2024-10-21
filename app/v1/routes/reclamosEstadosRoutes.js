import express from 'express'
import ReclamosEstadosController from '../../controllers/reclamosEstadosController.js'

const reclamosEstadosController = new ReclamosEstadosController()
const router = express.Router()

router.get('/', reclamosEstadosController.obtenerTodos)

router.get('/:idReclamoEstado', reclamosEstadosController.obtenerPorId)

router.post('/', reclamosEstadosController.agregar)

router.patch('/:idReclamoEstado', reclamosEstadosController.modificar)

export { router }