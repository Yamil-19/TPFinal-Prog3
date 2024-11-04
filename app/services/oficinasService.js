import Oficinas from '../database/oficinas.js';
import EmpleadosService from './empleadosService.js';
import ReclamosTiposService from './reclamosTiposService.js';
import dotenv from 'dotenv';

dotenv.config()

export default class OficinasService {
    constructor() {
        this.oficinas = new Oficinas()
        this.reclamosTipos = new ReclamosTiposService()
        this.empleados = new EmpleadosService()
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
    
    modificar = async (id, datos) => {
        // Verificar que el ID pasado por parametros exista
        await this.obtenerPorId(id);
        
        // Verificar el ID de reclamoTipo
        await this.reclamosTipos.obtenerPorId(datos.idReclamoTipo);
        
        const resultado = await this.oficinas.modificar(id, datos);
        if (!resultado || resultado.estado) {
            throw { 
                estado: resultado.estado || 500, 
                mensaje: resultado.mensaje || 'No se pudo modificar la oficina' 
            };
        }
        return resultado;
    };
    
    agregarUsuarioOficina = async (usuarios, idOficina) => {
        const listaEmpleados = await this.oficinas.obtenerUsuarios(idOficina)
        for (const e of listaEmpleados) {
            if (!usuarios.includes(e.idUsuario)) {
                const usuarioDesactivado = await this.oficinas.activo(0, e.idUsuario)
                // console.log('Desactivo:', usuarioDesactivado)
            }
        }
        for (const u of usuarios) {
            // const usuariosOficinas = await this.oficinas.obtenerUsuarioPorId(u)
            // if (usuariosOficinas) {
            //     for (const uo of usuariosOficinas) {
            //         const oficina = a
            //     }
            // }
            const empleado = listaEmpleados.find(e => e.idUsuario === u);
            if (empleado){
                if(empleado.activo === 0) {
                    const usuarioActivado = await this.oficinas.activo(1, empleado.idUsuario)
                    // console.log('Desactivo:', usuarioActivado)
                }
            } else {
                const resultado = await this.oficinas.agregarUsuarioOficina(u, idOficina);

                if (!resultado || resultado.estado) {
                    throw { 
                        estado: resultado.estado || 500, 
                        mensaje: resultado.mensaje || 'No se pudo agregar la oficina' 
                    };
                }
                return resultado;
            }
        }
    };
    // agregar empleados
    
    // quitar empleados
    
}