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
router.get('/cliente',authorization.verificarUsuario, (req, res) => {
    res.status(200).send(cliente)
})
router.get('/empleado', authorization.verificarUsuario, (req, res) => {
    res.status(200).send(empleado)
})
router.get('/administrador',authorization.verificarUsuario, (req, res) => {
    res.status(200).send(administrador)
})

router.get('/cliente/reclamo',authorization.verificarUsuario, usuarioController.obtenerReclamo)
router.patch('/cliente/reclamo/:idReclamoEstado',authorization.verificarUsuario, usuarioController.cancelarReclamo)

router.get('/administrador/reclamos/tipos',authorization.verificarUsuario, usuarioController.obtenerReclamosTipo)
router.post('/administrador/reclamos/tipos/agregar',authorization.verificarUsuario, usuarioController.agregarReclamoTipo)
router.patch('/administrador/reclamos/tipos/modificar/:idReclamoTipo',authorization.verificarUsuario, usuarioController.modificarReclamoTipo) // <-----
router.patch('/administrador/reclamos/tipos/activar/:idReclamoTipo',authorization.verificarUsuario, usuarioController.modificarReclamoTipo) // <-----
router.patch('/administrador/reclamos/tipos/desactivar/:idReclamoTipo',authorization.verificarUsuario, usuarioController.modificarReclamoTipo) // <-----


router.post('/register', usuarioController.register)
router.post('/login', usuarioController.iniciarSesion)
router.post('/cliente/reclamo', usuarioController.crearReclamo)
// router.post('/administrador/empleado', usuarioController.crearEmpleado)
router.patch('/cliente/perfil/actualizar', usuarioController.actualizarPerfil)

export { router }
