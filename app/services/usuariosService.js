import Usuarios from "../database/usuario.js";
import { email } from "../v1/urlPages/url.js";
import nodemailer from 'nodemailer';
import handlebars from "handlebars";
import dotenv from 'dotenv';
import bcryptjs from "bcryptjs" 

dotenv.config()

export default class UsuariosService {
    constructor() {
        this.usuarios = new Usuarios()
    }

    obtenerTodos = async () => {
        const resultado = await this.usuarios.obtenerTodos();
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'Error en el servidor' 
            };
        }
        return resultado;
    }

    obtenerPorId = async (id) => {
        const resultado = await this.usuarios.obtenerPorId(id)
        if (!resultado) {
            throw { 
                estado: 404, 
                mensaje: 'ID no encontrado' 
            };
        } else if (resultado.estado) {
            throw { 
                estado: resultado.estado, 
                mensaje: resultado.mensaje 
            };
        }
        return resultado;
    }
    
    agregar = async (datos) => {
        // verificar si el email esta en uso
        await this.verificarEmail(datos.correoElectronico)

        // hashear contraseña
        const salt = await bcryptjs.genSalt(5);
        const constraseñaHasheada = await bcryptjs.hash(datos.contrasenia, salt);
        datos.contrasenia = constraseñaHasheada ;

        const resultado = await this.usuarios.agregar(datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo agregar el usuario' 
            };
        }
        return resultado;
    };

    modificar = async (id, datos) => {
        // verificar que el ID exista
        await this.obtenerPorId(id); // probablemente innecesario

        // verificar si el email esta en uso
        await this.verificarEmail(datos.correoElectronico);
        
        // hashear contraseña si es necesario
        if (datos.contrasenia) {
            const salt = await bcryptjs.genSalt(5);
            const constraseniaHasheada = await bcryptjs.hash(datos.contrasenia, salt);
            datos.contrasenia = constraseniaHasheada;
        };

        const resultado = await this.usuarios.modificar(id, datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo modificar el usuario' 
            };
        }
        return resultado;
    };

    verificarEmail = async (correoElectronico) => {
        const usuario = await this.usuarios.obtenerPorEmail(correoElectronico);
        if (usuario && usuario.estado) {
            throw { 
                estado: usuario.estado, 
                mensaje: usuario.mensaje 
            };
        } else if (usuario) {
            throw { 
                estado: 400, 
                mensaje: `El email está en uso` 
            };
        }
    }
    





    // agregarReclamo = (reclamo) => {
    //     const reclamoData = {
    //         ...reclamo, 
    //         fechaCreado:  new Date().toISOString().replace('T', ' ').replace('Z', '')
    //     }
    //     return this.clientes.agregarReclamo(reclamoData)
    // }

    // obtenerReclamo = (idUsuario) => {
    //     return this.clientes.obtenerReclamo(idUsuario)
    // }
    
    // cancelarReclamo = (idReclamoEstado, correoElectronico, nom) => { 
    //     const plantilla = email
    //     const template = handlebars.compile(plantilla)
    //     const datos = {
    //         nombre: nom,
    //         reclamo: 'Cancelado'
    //     }
    //     const correoHtml = template(datos)
    //     const transportador = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.CORREO,
    //             pass: process.env.CLAVE
    //         }
    //     })

    //     const mailOptions = {
    //         to: correoElectronico,
    //         subject: 'NOTIFICACION',
    //         html: correoHtml
    //     }

    //     transportador.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             console.error('Error sending email: ', error)
    //         } else {
    //             console.log('Email sent: ', info.response)
    //         }
    //     })
    //     return this.clientes.cancelarReclamo(idReclamoEstado)
    // }

    // obtenerReclamosTipo = () => {
    //     return this.administradores.obtenerReclamosTipo()
    // }

    // modificarReclamoTipo = (id, desc, act) => {
    //     return this.administradores.modificarReclamoTipo(id, desc, act)
    // }
    
    // agregarReclamoTipo = (reclamoTipo) => {
    //     return this.administradores.agregarReclamoTipo(reclamoTipo)
    // }

}