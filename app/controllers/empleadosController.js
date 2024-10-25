import EmpleadosService from "../services/empleadosService.js";
import { validar } from "../utils/validacion.js";
import dotenv from 'dotenv';

dotenv.config();

export default class EmpleadosController {
    constructor() {
        this.service = new EmpleadosService();
    }

    obtenerTodos = async (req, res) => {
        try {
            const empleadosObtenidos = await this.service.obtenerTodos();
            return res.status(200).json(empleadosObtenidos);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
    
    obtenerPorId = async (req, res) => {
        try {
            const id = req.params.idUsuario;
            validar(id, 'id');

            const empleadoObtenido = await this.service.obtenerPorId(id);
            return res.status(200).json(empleadoObtenido);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    agregar = async (req, res) => {
        try {
            const datos = req.body;
            validar(datos, 'usuarioRequerido');
            
            const nuevoEmpleado = await this.service.agregar(datos);
            return res.status(200).json(nuevoEmpleado);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
    
    modificar = async (req, res) => {
        try {
            const id = req.params.idUsuario;
            validar(id, 'id');

            const datos = req.body;
            validar(datos, 'usuarioOpcional');
            
            const empleadoModificado = await this.service.modificar(id, datos);
            return res.status(200).json(empleadoModificado);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
}