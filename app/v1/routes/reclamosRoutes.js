import express from 'express'
import ReclamosController from '../../controllers/reclamosController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const reclamosController = new ReclamosController()
const router = express.Router()

router.get('/', passport.authenticate("jwt", { session: false }), reclamosController.obtenerTodos)

router.get('/informe/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosController.informe)

router.get('/:idReclamo', passport.authenticate("jwt", { session: false }), reclamosController.obtenerPorId)

router.post('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([3]), reclamosController.agregar)

router.post('/atencion/:idReclamo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([2]), reclamosController.atenderReclamo)

router.post('/cancelacion/:idReclamo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([3]), reclamosController.cancelarReclamo)

export { router }