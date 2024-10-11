import Oficinas from '../database/oficinas.js';
import dotenv from 'dotenv';

dotenv.config()

export default class OficinasService {
    constructor() {
        this.oficinas = new Oficinas()
    }

    obtenerTodos = () => {
        return this.oficinas.obtenerTodos();
    }
    
    obtenerPorId = (id) => {
        return this.oficinas.obtenerPorId(id);
    }

    crear = (oficina) => {
        return this.oficinas.crear(oficina);
    }

    modificar = (id) => {
        return this.oficinas.modificar(id);
    }

}