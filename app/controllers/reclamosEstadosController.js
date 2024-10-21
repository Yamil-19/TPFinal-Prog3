import ReclamosEstadosService from "../services/reclamosEstadosService.js";
import { validar } from "../utils/validacion.js";
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosEstadosController {
    constructor() {
        this.service = new ReclamosEstadosService()
    }

    obtenerTodos = async (req, res) => {
        try {
            const estadosObtenidos = await this.service.obtenerTodos()
            return res.status(200).json(estadosObtenidos);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
    
    obtenerPorId = async (req, res) => {
        try {
            const id = req.params.idReclamoEstado;
            validar(id, 'id');

            const estadoObtenido = await this.service.obtenerPorId(id);
            return res.status(200).json(estadoObtenido);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    agregar = async (req, res) => {
        try {
            const descripcion = req.body;
            validar(descripcion, 'descripcion');
            
            const nuevoEstado = await this.service.agregar(descripcion);
            return res.status(200).json(nuevoEstado);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
    
    modificar = async (req, res) => {
        try {
            const id = req.params.idReclamoEstado;
            validar(id, 'id');

            const descripcion = req.body;
            validar(descripcion, 'descripcion');
            
            const estadoModificado = await this.service.modificar(id, descripcion);
            return res.status(200).json(estadoModificado);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

}