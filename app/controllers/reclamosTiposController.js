import ReclamosTiposService from "../services/reclamosTiposService.js";
import dotenv from 'dotenv';

dotenv.config()

export default class ReclamosTiposController {
    constructor() {
        this.service = new ReclamosTiposService()
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