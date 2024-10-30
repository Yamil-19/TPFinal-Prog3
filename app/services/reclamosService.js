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
    
    obtenerPorIdReclamo = async (id) => {
        return await this.reclamos.obtenerPorIdReclamo(id);
    }

    obtenerPorIdReclamoEstado = async (id) => {
        // verificar el idReclamoEstado
        return await this.reclamos.obtenerPorIdReclamoEstado(id);
    }

    obtenerPorIdReclamoTipo = async (id) => {
        // verificar el idReclamoTipo
        return await this.reclamos.obtenerPorIdReclamoTipo(id);
    }

    obtenerPorIdUsuarioCreador = async (id) => {
        // verificar el idUsuario
        return await this.reclamos.obtenerPorIdUsuarioCreador(id);
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

}