// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Usuarios from '../database/usuario.js';

export default class AuthService {
    constructor(){
        this.usuarios = new Usuarios()
    }

    iniciarSesion = async (correoElectronico, contrasenia) => {
        const usuario = await this.usuarios.obtenerPorEmail(correoElectronico);
        if (!usuario) {
            throw { 
                estado: 401, 
                mensaje: 'Email incorrecto' 
            };
        }

        const contraseniaCorrecta = await bcryptjs.compare(contrasenia, usuario.contrasenia)
        if (!contraseniaCorrecta) {
            throw { 
                estado: 401, 
                mensaje: 'Contraseña incorrecta' 
            };
        }

        const token = jwt.sign({ id: usuario.idUsuario }, 'tu_secreto_jwt', { expiresIn: '1h' });
        return token;
    }
}