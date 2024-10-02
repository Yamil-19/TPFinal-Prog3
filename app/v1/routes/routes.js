import express from 'express'
import { login, register, cliente, administrador, empleado } from '../urlPages/url.js'
import UsuarioController from '../../controllers/usuarioController.js'
import { method as authorization } from '../../middlewares/methods.js'

const usuarioController = new UsuarioController()
const router = express.Router()

router.get('/', authorization.soloPublico ,(req, res) => {
    res.status(200).send(login)
})
router.get('/register', authorization.soloPublico, (req, res) => {
    res.status(200).send(register)
})
router.get('/cliente',authorization.soloCliente, (req, res) => {
    res.status(200).send(cliente)
})
router.get('/empleado', authorization.soloCliente, (req, res) => {
    res.status(200).send(empleado)
})
router.get('/administrador', (req, res) => {
    res.status(200).send(administrador)
})

router.get('/cliente/reclamo',authorization.soloCliente, usuarioController.obtenerReclamo)
router.patch('/cliente/reclamo/:idReclamoEstado',authorization.soloCliente, usuarioController.cancelarReclamo)

router.post('/register', usuarioController.register)
router.post('/login', usuarioController.iniciarSesion)
router.post('/cliente/reclamo', usuarioController.crearReclamo)

export { router }
