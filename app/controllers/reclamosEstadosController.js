import ReclamosEstadosService from "../services/reclamosEstadosService.js";
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosEstadosController {
    constructor() {
        this.service = new ReclamosEstadosService()
    }

    obtenerTodos = async (req, res) => {

    }
    
    obtenerPorId = async (req, res) => {

    }

    crear = async (req, res) => {

    }
    
    modificar = async (req, res) => {

    }

}