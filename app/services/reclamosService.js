import Reclamos from '../database/reclamos.js';
import dotenv from 'dotenv';
import UsuariosService from './usuariosService.js';
import InformeService from './informesService.js';

dotenv.config()

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos()
        this.usuarios = new UsuariosService()
        this.informes = new InformeService()
    }

    obtenerTodos = async (idUsuarioTipo, idUsuario) => {
        let id = idUsuario
        if (idUsuarioTipo === 2) {
            id = await this.reclamos.obtenerIdReclamoTipo(idUsuario);
        }
        
        const resultado = await this.reclamos.obtenerTodos(idUsuarioTipo, id);
        if (!resultado) {
            throw { 
                estado: 400, 
                mensaje: 'no se wacho, algo anda mal' 
            };
        }

        return resultado
    }
    
    obtenerPorId = async (id) => {
        const resultado = await this.reclamos.obtenerPorId(id);
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
    }

    agregar = async (datos) => {
        // agregar la fecha de creacion
        // verificar ID de reclamoTipo
        // verificar ID de usuarioCreador
        // verificar que usuario sea cliente
        datos.idReclamoEstado = 1
        datos.fechaCreado = new Date().toISOString()

        return await this.reclamos.agregar(datos);
    }

    modificar = async (id, datos) => {
        return await this.reclamos.modificar(id, datos);
    }

    atenderReclamo = async (idReclamo, datos) => {
        // verificar ID del reclamo

        // verificar ID del reclamoEstado
        return await this.reclamos.modificar(idReclamo, datos);
    }

    cancelarReclamo = async (idReclamo) =>  {
        // verificar ID del reclamo
        await this.obtenerPorId(idReclamo)

        // verificar ID del reclamoEstado
        return await this.reclamos.modificar(idReclamo);
    }

    reportePdf = async () => {
        const datosReporte = await this.reclamos.buscarDatosReportePdf();

        if (!datosReporte || datosReporte.length === 0) {
            return { estado: false, mensaje: 'Sin datos para el reporte'};
        }

        const pdf = await this.informes.informeReclamosPdf(datosReporte);
        
        return {
            buffer: pdf,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="reporte.pdf"'
            }
        };
    }

    reporteCsv = async () => {
        const datosReporte = await this.reclamos.buscarDatosReporteCsv();

        if (!datosReporte || datosReporte.length === 0) {
            return {estado: false, mensaje: 'Sin datos para el reporte'};
        }

        const csv =  await this.informes.informeReclamosCsv(datosReporte);
        return {
            path: csv,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="reporte.csv"'
            }
        };
    }

    generarInforme = async (formato) => {
        if (formato === 'pdf') {
            return await this.reportePdf();

        }else if (formato === 'csv'){
            
            return await this.reporteCsv();

        }
    }
}