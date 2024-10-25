import ReclamosService from "../services/reclamosService.js";
import { validar } from "../utils/validacion.js"
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosController {
    constructor() {
        this.service = new ReclamosService()
    }

    obtenerTodos = async (req, res) => {
        try {
            const reclamosObtenidos = await this.service.obtenerTodos();
            return res.status(200).json(reclamosObtenidos);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
    
    obtenerPorIdReclamo = async (req, res) => {
        try {
            const id = req.params.idReclamo;
            validar(id, 'id');

            const reclamo = await this.service.obtenerPorIdReclamo(id);
            return res.status(200).json(reclamo);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    obtenerPorIdReclamoEstado = async (req, res) => {
        try {
            const id = req.params.idReclamoEstado;
            validar(id, 'id');

            const reclamo = await this.service.obtenerPorIdReclamoEstado(id);
            return res.status(200).json(reclamo);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    obtenerPorIdReclamoTipo = async (req, res) => {
        try {
            const id = req.params.idReclamoTipo;
            validar(id, 'id');

            const reclamo = await this.service.obtenerPorIdReclamoTipo(id);
            return res.status(200).json(reclamo);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    obtenerPorIdUsuarioCreador = async (req, res) => {
        try {
            const id = req.params.idUsuarioCreador;
            validar(id, 'id');

            const reclamo = await this.service.obtenerPorIdUsuarioCreador(id);
            return res.status(200).json(reclamo);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    agregar = async (req, res) => {
        try {
            const datos = req.body;
            validar(datos, 'reclamoRequerido');
            
            const nuevoReclamo = await this.service.agregar(datos);
            return res.status(200).json(nuevoReclamo);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
    
    modificar = async (req, res) => {
        try {
            const id = req.params.idReclamo;
            validar(id, 'id');

            const datos = req.body;
            validar(datos, 'reclamoOpcional');
            
            const reclamoModificado = await this.service.modificar(id, datos);
            return res.status(200).json(reclamoModificado);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }

    atenderReclamo = async (req, res) => {
        try {
            const idReclamo = req.params.idReclamo;
            validar(idReclamo, 'id');

            const datos = {
                idReclamoEstado: req.body.idReclamoEstado
            }
            validar(datos.idReclamoEstado, 'id');

            const reclamoAtendido = await this.service.atenderReclamo(idReclamo, datos);
            return res.status(200).json(reclamoAtendido);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ status: estado, data: { error: error.message } });
        }
    }
}