import express from 'express'
import EmpleadosController from '../../controllers/empleadosController.js'
import UsuariosController from '../../controllers/usuariosController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const empleadosController = new EmpleadosController()
const usuariosController = new UsuariosController()
const router = express.Router()

router.get('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), empleadosController.obtenerTodos)

router.get('/:idUsuario', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), empleadosController.obtenerPorId)

router.post('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), empleadosController.agregar)

router.patch('/:idUsuario', passport.authenticate("jwt", { session: false }), autorizarUsuarios([1]), usuariosController.actualizarPerfil)

export { router }