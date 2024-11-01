import ReclamosEstados from '../database/reclamosEstados.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosEstadosService {
    constructor() {
        this.reclamosEstados = new ReclamosEstados()
    }

    obtenerTodos = async () => {
        const resultado = await this.reclamosEstados.obtenerTodos();
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'Error en el servidor' 
            };
        }
        return resultado;
    };
    
    obtenerPorId = async (id) => {
        const resultado = await this.reclamosEstados.obtenerPorId(id);
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
    };
    
    agregar = async (descripcion) => {
        const resultado = await this.reclamosEstados.agregar(descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo agregar el reclamoEstado' 
            };
        }
        return resultado;
    };
    
    modificar = async (id, descripcion) => {
        await this.obtenerPorId(id)
        const resultado = await this.reclamosEstados.modificar(id, descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo modificar el reclamoEstado' 
            };
        }
        return resultado;
    };
    

}