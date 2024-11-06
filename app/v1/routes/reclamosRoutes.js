import express from 'express'
import ReclamosController from '../../controllers/reclamosController.js'
import passport from "../../middlewares/passport.js"

const reclamosController = new ReclamosController()
const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Reclamo:
 *       type: object
 *       properties:
 *         idReclamo:
 *           type: integer
 *           description: ID del reclamo
 *         asunto:
 *           type: string
 *           description: Asunto del reclamo
 *         descripcion:
 *           type: string
 *           description: descripcion del reclamo
 *         fechaCreado:
 *           type: string
 *           format: date-time
 *           description: fecha hora de creaciópn del reclamo. 
 *         fechaFinalizado:
 *           type: string
 *           format: date-time
 *           description: fecha hora de finalización del reclamo. 
 *         fechaCancelado:
 *           type: string
 *           format: date-time
 *           description: fecha hora de cancelación del reclamo. 
 *         idReclamoEstado:
 *           type: number
 *           description: ID del estado del reclamo
 *         idReclamoTipo:
 *           type: number
 *           description: ID del tipo del reclamo
 *         idUsuarioCreador:
 *           type: number
 *           description: ID del usuario creador del reclamo
 *         idUsuarioFinalizador:
 *           type: number
 *           description: ID del usuario finalizador del reclamo
 */

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
 *              items:
 *               $ref: '#/components/schemas/Reclamo'
 */
router.get('/', reclamosController.obtenerTodos)

router.get('/test', passport.authenticate("jwt", { session: false }), reclamosController.obtenerTodos);

// router.get('/:idReclamo', reclamosController.obtenerPorIdReclamo)
// router.get('/estado/:idReclamoEstado', reclamosController.obtenerPorIdReclamoEstado)
// router.get('/tipo/:idReclamoTipo', reclamosController.obtenerPorIdReclamoTipo)
// router.get('/creador/:idUsuarioCreador', reclamosController.obtenerPorIdUsuarioCreador)

router.get('/informe', reclamosController.informe)



router.post('/', reclamosController.agregar)

router.patch('/:idReclamo', reclamosController.modificar)

router.post('/atencion/:idReclamo', reclamosController.atenderReclamo)
router.post('/cancelacion/:idReclamo')

export { router }