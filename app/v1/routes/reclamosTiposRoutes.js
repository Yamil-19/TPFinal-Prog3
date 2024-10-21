import express from 'express'
import ReclamosTiposController from '../../controllers/reclamosTiposController.js'

const reclamosTiposController = new ReclamosTiposController()
const router = express.Router()

router.get('/', reclamosTiposController.obtenerTodos)

router.get('/:idReclamoTipo', reclamosTiposController.obtenerPorId)

router.post('/', reclamosTiposController.agregar)

router.patch('/:idReclamoTipo', reclamosTiposController.modificar)

export { router }