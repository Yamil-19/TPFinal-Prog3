import Oficinas from '../database/oficinas.js';
import ReclamosTipos from '../database/reclamosTipos.js';
import dotenv from 'dotenv';

dotenv.config()

export default class OficinasService {
    constructor() {
        this.oficinas = new Oficinas()
        this.reclamosTipos = new ReclamosTipos()
    }

    obtenerTodos = async () => {
        return await this.oficinas.obtenerTodos();
    }
    
    obtenerPorId = async (id) => {
        return await this.oficinas.obtenerPorId(id);
    }

    agregar = async (datos) => {
        // verificar que el ID de reclamoTipo exista
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        return await this.oficinas.agregar(datos);
    }

    modificar = async (id, datos) => {
        // verificar que el ID exista
        await this.oficinas.obtenerPorId(id);

        // verificar que el ID de reclamoTipo exista
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        return await this.oficinas.modificar(id, datos);
    }

}