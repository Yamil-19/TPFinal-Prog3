import express from 'express'
import ReclamosController from '../../controllers/reclamosController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const reclamosController = new ReclamosController()
const router = express.Router()

router.get('/', reclamosController.obtenerTodos)

router.get('/:idReclamo', passport.authenticate("jwt", { session: false }), reclamosController.obtenerPorId)

// router.get('/:idReclamo', reclamosController.obtenerPorIdReclamo)
// router.get('/estado/:idReclamoEstado', reclamosController.obtenerPorIdReclamoEstado)
// router.get('/tipo/:idReclamoTipo', reclamosController.obtenerPorIdReclamoTipo)
// router.get('/creador/:idUsuarioCreador', reclamosController.obtenerPorIdUsuarioCreador)

router.post('/atencion/:idReclamo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([2]), reclamosController.atenderReclamo)

router.post('/cancelacion/:idReclamo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([3]), reclamosController.cancelarReclamo)

export { router }