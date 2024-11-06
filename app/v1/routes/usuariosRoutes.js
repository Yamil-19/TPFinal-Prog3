import express from 'express'
import UsuariosController from '../../controllers/usuariosController.js'
import passport from "../../middlewares/passport.js"

const usuariosController = new UsuariosController()
const router = express.Router()

router.post('/registro', usuariosController.registrar)

router.patch('/actualizar-perfil', passport.authenticate("jwt", { session: false }), usuariosController.actualizarPerfil)

export { router }