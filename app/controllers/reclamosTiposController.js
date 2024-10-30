import ReclamosTiposService from "../services/reclamosTiposService.js";
import { validar } from "../utils/validacion.js";
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosTiposController {
    constructor() {
        this.service = new ReclamosTiposService()
    }

    obtenerTodos = async (req, res) => {
        try {
            const tiposObtenidos = await this.service.obtenerTodos()
            return res.status(200).json(tiposObtenidos);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ 
                status: estado, 
                data: { error: error.message } 
            });
        }
    }
    
    obtenerPorId = async (req, res) => {
        try {
            const id = req.params.idReclamoTipo;
            validar(id, 'id');

            const tipoObtenido = await this.service.obtenerPorId(id);
            return res.status(200).json(tipoObtenido);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ 
                status: estado, 
                data: { error: error.message } 
            });
        }
    }

    agregar = async (req, res) => {
        try {
            const descripcion = req.body;
            validar(descripcion, 'descripcion');
            
            const nuevoTipo = await this.service.agregar(descripcion);
            return res.status(200).json(nuevoTipo);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ 
                status: estado, 
                data: { error: error.message } 
            });
        }
    }
    
    modificar = async (req, res) => {
        try {
            const id = req.params.idReclamoTipo;
            validar(id, 'id');

            const descripcion = req.body;
            validar(descripcion, 'descripcion');
            
            const tipoModificado = await this.service.modificar(id, descripcion);
            return res.status(200).json(tipoModificado);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ 
                status: estado, 
                data: { error: error.message } 
            });
        }
    }

}