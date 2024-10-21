import ReclamosTipos from '../database/reclamosTipos.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosTiposService {
    constructor() {
        this.reclamosTipos = new ReclamosTipos()
    }

    obtenerTodos = async () => {
        return await this.reclamosTipos.obtenerTodos();
    }
    
    obtenerPorId = async (id) => {
        return await this.reclamosTipos.obtenerPorId(id);
    }

    agregar = async (descripcion) => {
        return await this.reclamosTipos.agregar(descripcion);
    }

    modificar = async (id, descripcion) => {
        // verificar que el ID exista
        await this.reclamosTipos.obtenerPorId(id);
        
        return await this.reclamosTipos.modificar(id, descripcion);
    }

}