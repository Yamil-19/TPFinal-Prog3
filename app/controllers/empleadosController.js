import EmpleadosService from "../services/empleadosService.js";
import dotenv from 'dotenv';

dotenv.config()

export default class EmpleadosController {
    constructor() {
        this.service = new EmpleadosService()
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