import express from 'express'
import UsuarioController from '../../controllers/usuariosController.js'

const usuarioController = new UsuarioController()
const router = express.Router()

router.get('/')

router.get('/:idReclamoEstado')

router.post('/')

router.patch('/:idReclamoEstado')

export { router }