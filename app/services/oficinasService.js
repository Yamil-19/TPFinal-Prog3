import Oficinas from '../database/oficinas.js';
import ReclamosTiposService from './reclamosTiposService.js';
import dotenv from 'dotenv';

dotenv.config()

export default class OficinasService {
    constructor() {
        this.oficinas = new Oficinas()
        this.reclamosTipos = new ReclamosTiposService()
    }

    obtenerTodos = async () => {
        const resultado = await this.oficinas.obtenerTodos();
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'Error en el servidor' 
            };
        }
        return resultado;
    };
    
    obtenerPorId = async (id) => {
        const resultado = await this.oficinas.obtenerPorId(id);
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
        // Verificar el ID de reclamoTipo
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        const resultado = await this.oficinas.agregar(descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo agregar la oficina' 
            };
        }
        return resultado;
    };
    
    modificar = async (id, descripcion) => {
        // Verificar que el ID pasado por parametros exista
        await this.obtenerPorId(id);

        // Verificar el ID de reclamoTipo
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        const resultado = await this.oficinas.modificar(id, descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo modificar la oficina' 
            };
        }
        return resultado;
    };

    // agregar empleados

    // quitar empleados

}