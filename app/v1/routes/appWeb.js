import express from 'express'
import { login, register, cliente, administrador, empleado } from '../urlPages/url.js'
import { method as authorization } from '../../middlewares/methods.js'

const router = express.Router()

router.get('/', authorization.estaLogueado ,(req, res) => {
    res.status(200).send(login)
})
router.get('/register', authorization.estaLogueado, (req, res) => {
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

export { router }