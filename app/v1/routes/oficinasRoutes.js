import express from 'express'
import UsuarioController from '../../controllers/usuariosController.js'

const usuarioController = new UsuarioController()
const router = express.Router()

router.get('/')

router.get('/:idOficina')

router.post('/')

router.patch('/:idOficina')

router.post('/agregar_empleado')

export { router }