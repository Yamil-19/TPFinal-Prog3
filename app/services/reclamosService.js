import Reclamos from '../database/reclamos.js';
import dotenv from 'dotenv';
import UsuariosService from './usuariosService.js';

dotenv.config()

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos()
        this.usuarios = new UsuariosService()
    }

    obtenerTodos = async (idUsuarioTipo, idUsuario) => {
        let id = idUsuario
        if (idUsuarioTipo === 2) {
            id = await this.reclamos.obtenerIdReclamoTipo(idUsuario);
        }
        
        const resultado = await this.reclamos.obtenerTodos(idUsuarioTipo, id);
        if (!resultado) {
            throw { 
                estado: 400, 
                mensaje: 'no se wacho, algo anda mal' 
            };
        }

        return resultado
    }
    
    obtenerPorId = async (id) => {
        const resultado = await this.reclamos.obtenerPorId(id);
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
        // agregar la fecha de creacion
        // verificar ID de reclamoTipo
        // verificar ID de usuarioCreador
        // verificar que usuario sea cliente
        datos.idReclamoEstado = 1
        datos.fechaCreado = new Date().toISOString()

        return await this.reclamos.agregar(datos);
    }

    modificar = async (id, datos) => {
        return await this.reclamos.modificar(id, datos);
    }

    atenderReclamo = async (idReclamo, datos) => {
        // verificar ID del reclamo

        // verificar ID del reclamoEstado
        return await this.reclamos.modificar(idReclamo, datos);
    }

    cancelarReclamo = async (idReclamo) =>  {
        // verificar ID del reclamo
        await this.obtenerPorId(idReclamo)

        // verificar ID del reclamoEstado
        return await this.reclamos.modificar(idReclamo);
    }
}