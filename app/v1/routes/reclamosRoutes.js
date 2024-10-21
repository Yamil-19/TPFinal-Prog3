import express from 'express'
import ReclamosController from '../../controllers/reclamosController.js'

const reclamosController = new ReclamosController()
const router = express.Router()

router.get('/', reclamosController.obtenerTodos)

router.get('/:idReclamo', reclamosController.obtenerPorId)
// router.get('/:idReclamoEstado')
// router.get('/:idReclamoTipo')
// router.get('/:idUsuario')

router.post('/', reclamosController.agregar)

router.patch('/:idReclamo', reclamosController.modificar)

export { router }