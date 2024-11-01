import Reclamos from '../database/reclamos.js';
import dotenv from 'dotenv';
import UsuariosService from './usuariosService.js';

dotenv.config()

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos()
        this.usuarios = new UsuariosService()
    }

    obtenerTodos = async () => {
        const idUsuarioTipo = 1
        const id = 8
        await this.usuarios.obtenerPorIdUsuarioTipo(idUsuarioTipo);
        return await this.reclamos.obtenerTodos(idUsuarioTipo, id);
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