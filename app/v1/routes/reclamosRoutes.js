import express from 'express'
import ReclamosController from '../../controllers/reclamosController.js'
import passport from "../../middlewares/passport.js"
import { autorizarUsuarios } from '../../middlewares/methods.js'

const reclamosController = new ReclamosController()
const router = express.Router()

/**
 * @swagger
 * /api/v1/reclamos:
 *  get:
 *      summary: Obtiene una lista de todos los reclamos
 *      security:
 *          - bearerAuth: []
 *      tags: [Reclamos]
 *      responses:
 *          200:
 *           description: lista de reclamos
 *           content:
 *            application/json:
 *             schema: 
 *              type: array
 *          
 */
router.get('/', passport.authenticate("jwt", { session: false }), reclamosController.obtenerTodos)

router.get('/:idReclamo', passport.authenticate("jwt", { session: false }), reclamosController.obtenerPorId)

router.post('/', passport.authenticate("jwt", { session: false }), autorizarUsuarios([3]), reclamosController.agregar)

router.get('/informe', reclamosController.informe)

router.post('/atencion/:idReclamo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([2]), reclamosController.atenderReclamo)

router.post('/cancelacion/:idReclamo', passport.authenticate("jwt", { session: false }), autorizarUsuarios([3]), reclamosController.cancelarReclamo)

export { router }