import Empleados from "../database/empleados.js";
import dotenv from 'dotenv';

dotenv.config()

export default class EmpleadosService {
    constructor() {
        this.empleados = new Empleados()
    }

    obtenerTodos = () => {
        return this.empleados.obtenerTodos();
    }
    
    obtenerPorId = (id) => {
        return this.empleados.obtenerPorId(id);
    }

    crear = (empleado) => {
        return this.empleados.crear(empleado);
    }

    modificar = (id) => {
        return this.empleados.modificar(id);
    }

}