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
    
    informe = async (req, res) => {
        const formatosPermitidos = ['pdf', 'csv']
        try{
            const formato = req.query.formato;
            
            if(!formato || !formatosPermitidos.includes(formato)){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Formato inválido para el informe."    
                })
            }
            
            // generar informe
            const {buffer, path, headers} = await this.service.generarInforme(formato);

            // setear la cabecera de respuesta 
            res.set(headers)

            if (formato === 'pdf') {
                // respuesta al cliente  
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                // respuesta al cliente
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            estado:"Falla",
                            mensaje: " No se pudo generar el informe."    
                        })
                    }
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        } 
    }
};