import UsuariosServices from "../services/usuariosService.js";
import jsonWebToken from 'jsonwebtoken'
import dotenv from 'dotenv'
import { method as authorization } from "../middlewares/methods.js"
import validar from "../utils/validacion.js";

dotenv.config()

export default class UsuariosController {
    constructor() {
        this.service = new UsuariosServices()
    }

    registrar = async (req, res) => {
        try {
            const datos = req.body;
            validar(datos, 'usuarioRequerido');
            datos.idUsuarioTipo = 3
            
            const nuevoEmpleado = await this.service.agregar(datos);
            return res.status(200).json(nuevoEmpleado);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    }
    
    actualizarPerfil = async (req, res) => {
        try {
            // el id debe obtenerlo del usuario logueado
            
            const id = req.params.idUsuario;
            validar(id, 'id');

            const datos = req.body;
            validar(datos, 'usuarioOpcional');
            
            const empleadoModificado = await this.service.modificar(id, datos);
            return res.status(200).json(empleadoModificado);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    }
}

