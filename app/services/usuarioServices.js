import Administrador from "../database/db_administrador.js";
import Cliente from "../database/db_cliente.js";
import Usuario from "../database/usuario.js";
import { email } from "../v1/urlPages/url.js";
import nodemailer from 'nodemailer'
import handlebars from "handlebars";
import dotenv from 'dotenv';
import bcryptjs from "bcryptjs" 

dotenv.config()


export default class UsuarioServices {
    constructor() {
        this.usuario = new Usuario()
        this.cliente = new Cliente()
        this.administrador = new Administrador()
    }

    obtenerDatos = (usuario) => {
        return this.usuario.obtenerDatos(usuario)
    }

    register = (usuario) => {
        return this.usuario.register(usuario)
    }

    iniciarSesion = (usuario) => {
        return this.usuario.iniciarSesion(usuario)
    }
    
    actualizarPerfil = async (datos, idUsuario) => {
        // console.log(datos)
        if (datos.contrasenia) {
            const nuevaContraseña = datos.contrasenia
            const salt = await bcryptjs.genSalt(5)
            const constraseñaHasheada = await bcryptjs.hash(nuevaContraseña, salt)
            datos.contrasenia = constraseñaHasheada 
            // console.log('VAMAAAA')
        }
        // console.log(datos)
        return this.usuario.actualizarPerfil(datos, idUsuario)
    }

    crearReclamo = (reclamo) => {
        const reclamoData = {
            ...reclamo, 
            fechaCreado:  new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.cliente.crearReclamo(reclamoData)
    }

    obtenerReclamo = (idUsuario) => {
        return this.cliente.obtenerReclamo(idUsuario)
    }
    
    cancelarReclamo = (idReclamoEstado, correoElectronico, nom) => { 
        const plantilla = email
        // console.log(email)
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
        return this.cliente.cancelarReclamo(idReclamoEstado)
    }

    obtenerReclamosTipo = () => {
        return this.administrador.obtenerReclamosTipo()
    }

    modificarReclamoTipo = (id, desc, act) => {
        return this.administrador.modificarReclamoTipo(id, desc, act)
    }
    
    agregarReclamoTipo = (reclamoTipo) => {
        return this.administrador.agregarReclamoTipo(reclamoTipo)
    }

}