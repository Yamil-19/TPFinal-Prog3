import express from 'express'
import UsuariosController from '../../controllers/usuariosController.js'

const usuariosController = new UsuariosController()
const router = express.Router()



router.post('/register', usuariosController.register)

router.post('/login', usuariosController.iniciarSesion)

export { router }