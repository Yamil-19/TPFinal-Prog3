import OficinasService from "../services/oficinasService.js";
import { validar } from "../utils/validacion.js";
import dotenv from 'dotenv';

dotenv.config()

export default class OficinasController {
    constructor() {
        this.service = new OficinasService()
    }

    obtenerTodos = async (req, res) => {
        try {
            const oficinasObtenidas = await this.service.obtenerTodos();
            return res.status(200).json(oficinasObtenidas);
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
            const id = req.params.idOficina;
            validar(id, 'id');

            const oficinaObtenida = await this.service.obtenerPorId(id);
            return res.status(200).json(oficinaObtenida);
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
            const datos = req.body;
            validar(datos, 'oficinaRequerida');
            
            const nuevaOficina = await this.service.agregar(datos);
            return res.status(200).json(nuevaOficina);
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
            const id = req.params.idOficina;
            validar(id, 'id');

            const datos = req.body;
            validar(datos, 'oficinaOpcional');
            
            const oficinaModificada = await this.service.modificar(id, datos);
            return res.status(200).json(oficinaModificada);
        } catch (error) {
            const estado = error.statusCode || 500;
            return res.status(estado).json({ 
                status: estado, 
                data: { error: error.message } 
            });
        }
    }

}