import Administradores from "../database/db_administrador.js";
import Clientes from "../database/clientes.js";
import Usuarios from "../database/usuario.js";
import { email } from "../v1/urlPages/url.js";
import nodemailer from 'nodemailer'
import handlebars from "handlebars";
import dotenv from 'dotenv';
import bcryptjs from "bcryptjs" 

dotenv.config()


export default class UsuariosService {
    constructor() {
        this.usuarios = new Usuarios()
        // this.clientes = new Clientes()
        // this.administradores = new Administradores()
    }

    obtenerDatos = (usuario) => {
        return this.usuarios.obtenerDatos(usuario)
    }

    obtenerPorIdUsuarioTipo = async (idUsuarioTipo) => {
        return await this.usuarios.obtenerPorIdUsuarioTipo(idUsuarioTipo);
    };
    
    register = (usuario) => {
        return this.usuarios.register(usuario)
    }

    iniciarSesion = (usuario) => {
        return this.usuarios.iniciarSesion(usuario)
    }
    
    actualizarPerfil = async (datos, idUsuario) => {
        if (datos.contrasenia) {
            const nuevaContraseña = datos.contrasenia
            const salt = await bcryptjs.genSalt(5)
            const constraseñaHasheada = await bcryptjs.hash(nuevaContraseña, salt)
            datos.contrasenia = constraseñaHasheada 
        }
        return this.usuarios.actualizarPerfil(datos, idUsuario)
    }

    agregarReclamo = (reclamo) => {
        const reclamoData = {
            ...reclamo, 
            fechaCreado:  new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.clientes.agregarReclamo(reclamoData)
    }

    obtenerReclamo = (idUsuario) => {
        return this.clientes.obtenerReclamo(idUsuario)
    }
    
    cancelarReclamo = (idReclamoEstado, correoElectronico, nom) => { 
        const plantilla = email
        const template = handlebars.compile(plantilla)
        const datos = {
            nombre: nom,
            reclamo: 'Cancelado'
        }
        const correoHtml = template(datos)
        const transportador = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CORREO,
                pass: process.env.CLAVE
            }
        })

        const mailOptions = {
            to: correoElectronico,
            subject: 'NOTIFICACION',
            html: correoHtml
        }

        transportador.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error)
            } else {
                console.log('Email sent: ', info.response)
            }
        })
        return this.clientes.cancelarReclamo(idReclamoEstado)
    }

    obtenerReclamosTipo = () => {
        return this.administradores.obtenerReclamosTipo()
    }

    modificarReclamoTipo = (id, desc, act) => {
        return this.administradores.modificarReclamoTipo(id, desc, act)
    }
    
    agregarReclamoTipo = (reclamoTipo) => {
        return this.administradores.agregarReclamoTipo(reclamoTipo)
    }

}