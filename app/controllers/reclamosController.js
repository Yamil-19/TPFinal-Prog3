import ReclamosService from "../services/reclamosService.js";
import { validarID, validarOficina } from "../utils/validacion.js"
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosController {
    constructor() {
        this.service = new ReclamosService()
    }

    obtenerTodos = async (req, res) => {
        try {
            const reclamosObtenidos = await this.service.obtenerTodos()
            return res.status(200).json(reclamosObtenidos);
        } catch (error) {
            return res.status(500).json({ status: "500", data: { error: error.message } });
        }
    }
    
    obtenerPorId = async (req, res) => {
        const idReclamo = parseInt(req.params.idReclamo);
        if (!validarID(idReclamo)) {
            return res.status(400).json({ status: "400", data: { error: "ID invalido" } });
        }
        try {
            const reclamo = await this.service.obtenerPorId(idReclamo)
            return res.status(200).json(reclamo);
        } catch (error) {
            return res.status(error.statusCode).json({ status: error.statusCode, data: { error: error.message } });
        }
    }

    agregar = async (req, res) => {
        const datos = {
            asunto: req.body.asunto,
            descripcion: req.body.descripcion,
            idUsuarioCreador: req.body.idUsuarioCreador,
            idReclamoTipo: req.body.idReclamoTipo
        }
        try {
            const nuevoReclamo = await this.service.agregar(datos)
            return res.status(200).json(nuevoReclamo)
        } catch(error) {
            return res.status(500).json({})
        }
    }
    
    modificar = async (req, res) => {

    }

}