import Empleados from "../database/empleados.js";
import bcryptjs from "bcryptjs" 
import dotenv from 'dotenv';

dotenv.config()

export default class EmpleadosService {
    constructor() {
        this.empleados = new Empleados()
    };

    obtenerTodos = async () => {
        return await this.empleados.obtenerTodos();
    };
    
    obtenerPorId = async (id) => {
        return await this.empleados.obtenerPorId(id);
    };

    agregar = async (datos) => {
        // verificar si el email esta en uso
        await this.empleados.verificarEmail(datos.correoElectronico);

        // hashear contraseña
        const nuevaContraseña = datos.contrasenia;
        const salt = await bcryptjs.genSalt(5);
        const constraseñaHasheada = await bcryptjs.hash(nuevaContraseña, salt);
        datos.contrasenia = constraseñaHasheada ;

        return await this.empleados.agregar(datos);
    };

    modificar = async (id, datos) => {
        // verificar que el ID exista
        await this.empleados.obtenerPorId(id);

        // verificar si el email esta en uso
        await this.empleados.verificarEmail(datos.correoElectronico);
        
        // hashear contraseña si es necesario
        if (datos.contrasenia) {
            const nuevaContraseña = datos.contrasenia;
            const salt = await bcryptjs.genSalt(5);
            const constraseñaHasheada = await bcryptjs.hash(nuevaContraseña, salt);
            datos.contrasenia = constraseñaHasheada;
        };

        return await this.empleados.modificar(id, datos);
    };
};