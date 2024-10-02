import Usuario from "../database/usuario.js";


export default class UsuarioServices {
    constructor() {
        this.usuario = new Usuario()
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

    crearReclamo = (reclamo) => {
        const reclamoData = {
            ...reclamo, 
            fechaCreado:  new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.usuario.crearReclamo(reclamoData)
    }

    obtenerReclamo = (idUsuario) => {
        return this.usuario.obtenerReclamo(idUsuario)
    }

    cancelarReclamo = (idReclamoEstado) => {
        return this.usuario.cancelarReclamo(idReclamoEstado)
    }
}