import express from 'express'
import ClientesController from '../../controllers/clientesController.js'
import { method as authorization } from '../../middlewares/methods.js'

const clientesController = new ClientesController()
const router = express.Router()



router.post('/')

router.patch('/:idUsuario', clientesController.actualizarPerfil)

export { router }
