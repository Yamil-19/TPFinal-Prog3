// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Usuarios from '../database/usuario.js';

export default class AuthService {
    constructor(){
        this.usuarios = new Usuarios()
    }

    registrar = async (datos) => {
        // verificar si el email esta en uso
        const resultado = await this.usuarios.obtenerPorEmail(datos.correoElectronico);
        if (resultado) {

        }

        // hashear contraseña
        const nuevaContraseña = datos.contrasenia;
        const salt = await bcryptjs.genSalt(5);
        const constraseñaHasheada = await bcryptjs.hash(nuevaContraseña, salt);
        datos.contrasenia = constraseñaHasheada ;

        return await this.usuarios.agregar(datos);
    };

    iniciarSesion = async (correoElectronico, contrasenia) => {
        const usuario = await this.usuarios.obtenerPorEmail(correoElectronico);

        const contraseniaCorrecta = await bcryptjs.compare(contrasenia, usuario.contrasenia)
        console.log(contraseniaCorrecta)

        // const resultado = await this.usuarios.iniciarSesion(correoElectronico, usuario.contrasenia);
        // console.log(resultado)
        // return resultado

        const token = jwt.sign({ id: usuario.idUsuario }, 'tu_secreto_jwt', { expiresIn: '1h' });
        return token;
    }
}