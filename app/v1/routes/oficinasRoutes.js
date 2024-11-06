import express from 'express'
import OficinasController from '../../controllers/oficinasController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const oficinasController = new OficinasController()
const router = express.Router()

router.get('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), oficinasController.obtenerTodos)

router.get('/:idOficina', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), oficinasController.obtenerPorId)

router.post('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), oficinasController.agregar)

router.patch('/:idOficina', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), oficinasController.modificar)

router.post('/agregar-empleados', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), oficinasController.agregarEmpleados)

router.post('/quitar-empleados', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), oficinasController.quitarEmpleados)

export { router }