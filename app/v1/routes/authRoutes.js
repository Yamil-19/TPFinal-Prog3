import express from 'express';
import AuthController from '../../controllers/authController.js';

const router = express.Router();
const authController = new AuthController()

// Registro
router.post('/register');

// Login
router.post('/login', authController.iniciarSesion);

export { router };
