import UsuariosService from "../services/usuariosService.js";
import validar from "../utils/validacion.js";
import dotenv from 'dotenv';

dotenv.config();

export default class EmpleadosController {
    constructor() {
        this.service = new UsuariosService();
    }

    obtenerTodos = async (req, res) => {
        try {
            const empleadosObtenidos = await this.service.obtenerTodos();
            return res.status(200).json(empleadosObtenidos);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    }
    
    obtenerPorId = async (req, res) => {
        try {
            const id = req.params.idUsuario;
            validar(id, 'id');

            const empleadoObtenido = await this.service.obtenerPorId(id);
            return res.status(200).json(empleadoObtenido);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    }

    agregar = async (req, res) => {
        try {
            const datos = req.body;
            validar(datos, 'usuarioRequerido');
            datos.idUsuarioTipo = 2
            
            const nuevoEmpleado = await this.service.agregar(datos);
            return res.status(200).json(nuevoEmpleado);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    }
}