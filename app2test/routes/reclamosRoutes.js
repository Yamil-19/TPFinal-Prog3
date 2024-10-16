import express from 'express';

import ReclamosController from '../controllers/reclamoController.js';

const router = express.Router();

const reclamosController = new ReclamosController();

router.get('/', reclamosController.buscarTodos);

export {router};