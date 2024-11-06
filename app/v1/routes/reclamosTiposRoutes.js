import express from 'express'
import ReclamosTiposController from '../../controllers/reclamosTiposController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const reclamosTiposController = new ReclamosTiposController()
const router = express.Router()

router.get('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosTiposController.obtenerTodos)

router.get('/:idReclamoTipo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosTiposController.obtenerPorId)

router.post('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosTiposController.agregar)

router.patch('/:idReclamoTipo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), reclamosTiposController.modificar)

export { router }