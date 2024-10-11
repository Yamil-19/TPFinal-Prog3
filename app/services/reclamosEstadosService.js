import ReclamosEstados from '../database/reclamosEstados.js';
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosEstadosService {
    constructor() {
        this.reclamosEstados = new ReclamosEstados()
    }

    obtenerTodos = () => {
        return this.reclamosEstados.obtenerTodos();
    }
    
    obtenerPorId = (id) => {
        return this.reclamosEstados.obtenerPorId(id);
    }

    crear = (reclamosEstado) => {
        return this.reclamosEstados.crear(reclamosEstado);
    }

    modificar = (id) => {
        return this.reclamosEstados.modificar(id);
    }

}