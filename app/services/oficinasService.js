import Oficinas from '../database/oficinas.js';
import ReclamosTiposService from './reclamosTiposService.js';
import UsuariosService from './usuariosService.js';
import UsuariosOficinas from '../database/usuariosOficinas.js';

import dotenv from 'dotenv';

dotenv.config()

export default class OficinasService {
    constructor() {
        this.oficinas = new Oficinas()
        this.reclamosTipos = new ReclamosTiposService()
        this.usuarios = new UsuariosService()
        this.usuariosOficinas = new UsuariosOficinas()
    }

    obtenerTodos = async () => {
        const resultado = await this.oficinas.obtenerTodos();
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'Error en el servidor' 
            };
        }
        return resultado;
    };
    
    obtenerPorId = async (id) => {
        const resultado = await this.oficinas.obtenerPorId(id);
        if (!resultado) {
            throw { 
                estado: 404, 
                mensaje: 'ID no encontrado' 
            };
        } else if (resultado.estado) {
            throw { 
                estado: resultado.estado, 
                mensaje: resultado.mensaje 
            };
        }
        return resultado;
    };
    
    agregar = async (datos) => {
        // Verificar el ID de reclamoTipo
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        const resultado = await this.oficinas.agregar(datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo agregar la oficina' 
            };
        }
        return resultado;
    };
    
    modificar = async (id, descripcion) => {
        // Verificar que el ID pasado por parametros exista
        await this.obtenerPorId(id);

        // Verificar el ID de reclamoTipo
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);

        const resultado = await this.oficinas.modificar(id, descripcion);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo modificar la oficina' 
            };
        }
        return resultado;
    };

    agregarEmpleados = async (idOficina, listaIdEmpleados) => {
        const lea = []
        const lem = []

        // verificar idOficina
        await this.obtenerPorId(idOficina);

        // verificar el id de los empleados
        for (const id of listaIdEmpleados) {
            await this.usuarios.obtenerPorId(id)
        }
        
        for (const id of listaIdEmpleados) {
            const estaEnUO = await this.usuariosOficinas.obtenerPorIdUsuario(id)
            if (!estaEnUO) {
                lea.push(id)
            } else {
                lem.push(id)
            }
        }

        return await this.usuariosOficinas.agregarEmpleados(lea, lem, idOficina)

    }

    quitarEmpleados = async (idOficina, listaIdEmpleados) =>{
        const errores = [];

        // verificar idOficina
        await this.obtenerPorId(idOficina);

        // verificar el id de los empleados
        for (const id of listaIdEmpleados) {
            await this.usuarios.obtenerPorId(id);
        };
        
        for (const id of listaIdEmpleados) {
            const resultado = await this.usuariosOficinas.obtenerPorIdUsuario(id);
            if (!resultado || resultado.activo === 0) {
                errores.push(`El empleado ${id} no está asignado a una oficina`);
            };
        };
        
        if (errores.length) {
            throw {
                estado: 400, 
                mensaje: errores
            };
        };

        return await this.usuariosOficinas.quitarEmpleados(idOficina, listaIdEmpleados);
    };

}