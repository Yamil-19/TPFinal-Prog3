import ReclamosService from "../services/reclamosService.js";
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosController {
    constructor() {
        this.service = new ReclamosService()
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