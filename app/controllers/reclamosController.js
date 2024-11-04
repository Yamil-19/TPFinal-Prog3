import ReclamosService from "../services/reclamosService.js";
import validar from "../utils/validacion.js"
import dotenv from 'dotenv';


dotenv.config()

export default class ReclamosController {
    constructor() {
        this.service = new ReclamosService()
    }

    obtenerTodos = async (req, res) => {
        const { idUsuario, idUsuarioTipo } = req.user

        try {
            const reclamosObtenidos = await this.service.obtenerTodos(idUsuarioTipo, idUsuario);
            return res.status(200).json(reclamosObtenidos);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    };
    
    obtenerPorId = async (req, res) => {
        try {
            const id = req.params.idReclamo;
            validar(id, 'id');

            const reclamo = await this.service.obtenerPorId(id);
            return res.status(200).json(reclamo);
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
            validar(datos, 'reclamoRequerido');
            
            const nuevoReclamo = await this.service.agregar(datos);
            return res.status(200).json(nuevoReclamo);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
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
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
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
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    };

    cancelarReclamo = async (req, res) => {
        try {
            const idReclamo = req.params.idReclamo;
            validar(idReclamo, 'id');

            const reclamoAtendido = await this.service.cancelarReclamo(idReclamo);
            return res.status(200).json(reclamoAtendido);
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    };

};