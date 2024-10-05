import Cliente from "../database/db_cliente.js";
import Usuario from "../database/usuario.js";


export default class UsuarioServices {
    constructor() {
        this.usuario = new Usuario()
        this.cliente = new Cliente()
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
    
    actualizarPerfil = (usuarioActualizado) => {
        return this.usuario.actualizarPerfil(usuarioActualizado)
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

    cancelarReclamo = (idReclamoEstado) => {
        return this.cliente.cancelarReclamo(idReclamoEstado)
    }

}