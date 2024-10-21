import Reclamos from '../database/reclamos.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos()
    }

    obtenerTodos = async () => {
        return await this.reclamos.obtenerTodos();
    }
    
    obtenerPorId = async (id) => {
        return await this.reclamos.obtenerPorId(id);
    }

    agregar = (nuevoReclamo) => {
        nuevoReclamo = {
            ...nuevoReclamo,
            fechaCreado: new Date().toISOString(),
            // idReclamoEstado: 1
        }
        return this.reclamos.agregar(nuevoReclamo);
    }

    modificar = (id) => {
        return this.reclamos.modificar(id);
    }

}