import ReclamosTipos from '../database/reclamosTipos.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosTiposService {
    constructor() {
        this.reclamosTipos = new ReclamosTipos()
    }

    obtenerTodos = () => {
        return this.reclamosTipos.obtenerTodos();
    }
    
    obtenerPorId = (id) => {
        return this.reclamosTipos.obtenerPorId(id);
    }

    crear = (reclamosTipo) => {
        return this.reclamosTipos.crear(reclamosTipo);
    }

    modificar = (id) => {
        return this.reclamosTipos.modificar(id);
    }

}