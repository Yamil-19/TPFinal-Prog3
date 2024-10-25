import express from 'express'
import ReclamosController from '../../controllers/reclamosController.js'

const reclamosController = new ReclamosController()
const router = express.Router()

router.get('/', reclamosController.obtenerTodos)

router.get('/:idReclamo', reclamosController.obtenerPorIdReclamo)
router.get('/estado/:idReclamoEstado', reclamosController.obtenerPorIdReclamoEstado)
router.get('/tipo/:idReclamoTipo', reclamosController.obtenerPorIdReclamoTipo)
router.get('/creador/:idUsuarioCreador', reclamosController.obtenerPorIdUsuarioCreador)

router.post('/', reclamosController.agregar)

router.patch('/:idReclamo', reclamosController.modificar)

router.post('/atencion/:idReclamo', reclamosController.atenderReclamo)
router.post('/cancelacion/:idReclamo')

export { router }