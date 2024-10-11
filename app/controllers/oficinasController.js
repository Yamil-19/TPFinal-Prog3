import OficinasService from "../services/oficinasService.js";
import dotenv from 'dotenv';

dotenv.config()

export default class OficinasController {
    constructor() {
        this.service = new OficinasService()
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