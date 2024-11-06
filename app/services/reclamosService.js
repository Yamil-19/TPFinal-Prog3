import Reclamos from '../database/reclamos.js';
import dotenv from 'dotenv';
import UsuariosService from './usuariosService.js';
import ReclamosTiposService from './reclamosTiposService.js';
import ReclamosEstadosService from "./reclamosEstadosService.js";

dotenv.config()

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos()
        this.usuarios = new UsuariosService()
        this.reclamosTipos = new ReclamosTiposService()
        this.reclamosEstados = new ReclamosEstadosService()
    }

    obtenerTodos = async (idUsuario, idUsuarioTipo) => {
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
    
    obtenerPorId = async (idReclamo, idUsuario, idUsuarioTipo) => {
        let id = idUsuario
        if (idUsuarioTipo === 2) {
            id = await this.reclamos.obtenerIdReclamoTipo(idUsuario);
        }

        const resultado = await this.reclamos.obtenerPorId(idReclamo, idUsuarioTipo, id);
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
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        const resultado = await this.reclamos.agregar(datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo agregar el reclamo' 
            };
        }
        return resultado;
    }

    atenderReclamo = async (idReclamo, datos, idUsuario) => {
        // verificar ID del reclamo, y si puede ser atendido
        const reclamo = await this.obtenerPorId(idReclamo, idUsuario, 2)

        if (reclamo.idReclamoEstado === 3 || reclamo.idReclamoEstado === 4) {
            throw {
                estado: 400,
                mensaje: 'No se puede atender el reclamo'
            }
        } 

        // verificar ID del reclamoEstado, en el caso que el nuevo estado sea 'Finalizado' se agregan los datos correspondientes
        const reclamoEstado = await this.reclamosEstados.obtenerPorId(datos.idReclamoEstado)
        if (reclamoEstado.descripcion === 'Finalizado') {
            datos.idUsuarioFinalizador = idUsuario
            datos.fechaFinalizado = new Date().toISOString()
        }
        
        const resultado = await this.reclamos.modificar(idReclamo, datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: 'No se pudo atender el reclamo' 
            };
        }
        return resultado;
    }

    cancelarReclamo = async (idReclamo, idUsuario) =>  {
        // verificar ID del reclamo, y si puede ser cancelado
        const reclamo = await this.obtenerPorId(idReclamo, idUsuario, 3)
        if (reclamo.idReclamoEstado !== 1) {
            throw {
                estado: 400,
                mensaje: 'No se puede cancelar el reclamo'
            }
        }
        const datos = {
            idReclamoEstado: 3
        }

        const resultado = await this.reclamos.modificar(idReclamo, datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: 'No se pudo cancelar el reclamo' 
            };
        }
        return resultado;
    }
}