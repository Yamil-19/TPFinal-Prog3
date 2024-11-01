import ReclamosTipos from '../database/reclamosTipos.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosTiposService {
    constructor() {
        this.reclamosTipos = new ReclamosTipos()
    }

    obtenerTodos = async () => {
        const resultado = await this.reclamosTipos.obtenerTodos();
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'Error en el servidor' 
            };
        }
        return resultado;
    };
    
    obtenerPorId = async (id) => {
        const resultado = await this.reclamosTipos.obtenerPorId(id);
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
        const resultado = await this.reclamosTipos.agregar(descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo agregar el reclamoTipo' 
            };
        }
        return resultado;
    };
    
    modificar = async (id, descripcion) => {
        await this.obtenerPorId(id)
        const resultado = await this.reclamosTipos.modificar(id, descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo modificar el reclamoTipo' 
            };
        }
        return resultado;
    };

}