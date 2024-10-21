import ReclamosEstados from '../database/reclamosEstados.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosEstadosService {
    constructor() {
        this.reclamosEstados = new ReclamosEstados()
    }

    obtenerTodos = async () => {
        return await this.reclamosEstados.obtenerTodos();
    }
    
    obtenerPorId = async (id) => {
        return await this.reclamosEstados.obtenerPorId(id);
    }

    agregar = async (descripcion) => {
        return await this.reclamosEstados.agregar(descripcion);
    }

    modificar = async (id, descripcion) => {
        await this.reclamosEstados.obtenerPorId(id);
        return await this.reclamosEstados.modificar(id, descripcion);
    }

}