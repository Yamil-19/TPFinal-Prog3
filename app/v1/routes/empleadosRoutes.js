import express from 'express'
import UsuarioController from '../../controllers/usuariosController.js'

const usuarioController = new UsuarioController()
const router = express.Router()

router.get('/')

router.get('/:idUsuario')

router.get('/:idUsuarioTipo')

router.post('/')

router.patch('/:idUsuario')

export { router }