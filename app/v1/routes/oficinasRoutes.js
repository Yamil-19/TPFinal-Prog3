import express from 'express'
import OficinasController from '../../controllers/oficinasController.js'

const oficinasController = new OficinasController()
const router = express.Router()

router.get('/', oficinasController.obtenerTodos)

router.get('/:idOficina', oficinasController.obtenerPorId)

router.post('/', oficinasController.agregar)

router.patch('/:idOficina', oficinasController.modificar)

router.post('/agregar-empleados', oficinasController.agregarEmpleados)

router.post('/quitar-empleados', oficinasController.quitarEmpleados)

export { router }