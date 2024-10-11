import express from 'express'
import UsuarioController from '../../controllers/usuariosController.js'

const usuarioController = new UsuarioController()
const router = express.Router()

router.get('/')

router.get('/:idReclamo')
// router.get('/:idReclamoEstado')
// router.get('/:idReclamoTipo')
// router.get('/:idUsuario')

router.post('/')

router.patch('/:idReclamo')

export { router }