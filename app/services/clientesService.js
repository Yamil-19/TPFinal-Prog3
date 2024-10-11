import Clientes from "../database/clientes.js";
// import Usuario from "../database/usuario.js";
import { email } from "../v1/urlPages/url.js";
import nodemailer from 'nodemailer'
import handlebars from "handlebars";
import dotenv from 'dotenv';
import bcryptjs from "bcryptjs" 

dotenv.config()

export default class ClienteService {
    constructor() {
        this.clientes = new Clientes()
    }

    obtenerReclamo = (idUsuario) => {
        return this.clientes.obtenerReclamo(idUsuario)
    }

    actualizarPerfil = async (datos, idUsuario) => {
        if (datos.contrasenia) {
            const nuevaContraseña = datos.contrasenia
            const salt = await bcryptjs.genSalt(5)
            const constraseñaHasheada = await bcryptjs.hash(nuevaContraseña, salt)
            datos.contrasenia = constraseñaHasheada 
        }
        return this.clientes.actualizarPerfil(datos, idUsuario)
    }
}