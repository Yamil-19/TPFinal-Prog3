import express from 'express'
import ReclamosEstadosController from '../../controllers/reclamosEstadosController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const reclamosEstadosController = new ReclamosEstadosController()
const router = express.Router()

router.get('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosEstadosController.obtenerTodos)

router.get('/:idReclamoEstado', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosEstadosController.obtenerPorId)

router.post('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosEstadosController.agregar)

router.patch('/:idReclamoEstado', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosEstadosController.modificar)

export { router }