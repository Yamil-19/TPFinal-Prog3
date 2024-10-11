import express from 'express'
import UsuarioController from '../../controllers/usuariosController.js'

const usuarioController = new UsuarioController()
const router = express.Router()

router.get('/')

router.get('/:idReclamoTipo')

router.post('/')

router.patch('/:idReclamoTipo')

export { router }