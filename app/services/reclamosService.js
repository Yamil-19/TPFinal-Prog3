import Reclamos from '../database/reclamos.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos()
    }

    obtenerTodos = () => {
        return this.reclamos.obtenerTodos();
    }
    
    obtenerPorId = (id) => {
        return this.reclamos.obtenerPorId(id);
    }

    crear = (reclamo) => {
        return this.reclamos.crear(reclamo);
    }

    modificar = (id) => {
        return this.reclamos.modificar(id);
    }

}