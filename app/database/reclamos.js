import { conexion } from "./conexion.js";
import ApiError from "../utils/manejoDeErrores.js";

export default class Reclamos {   
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM reclamos;`;
            const [resultado] = await conexion.query(sql);
            return resultado;
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idReclamo = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
            if (resultado.length === 0) {
                throw new ApiError('ID no encontrado', 404);
            } else {
                return resultado
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            } else {
                throw new ApiError('Error en el servidor', 500)
            }
        }
    }

    agregar = async (datos) => {
        try {
            const sql = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) VALUES (?,?,?,1,?,?)`
            const [resultado] = await conexion.query(sql, [datos])
            return resultado
        } catch (error) {
            throw new ApiError('Error en el servidor', 500)
        }
    }

    modificar = async () => {
        
    }
    
    agregarReclamo = async ({tipo, asunto, descripcion, fechaCreado, idUsuarioCreador}) => {
        try {
            const sql = `SELECT idReclamoTipo from reclamostipo WHERE descripcion = ?`
            const [resultado] = await conexion.query(sql, [tipo])
            
            const sql2 = `INSERT INTO reclamosestado (descripcion, activo) VALUES (?,?)`
            const [resultado2] = await conexion.query(sql2, ['creado', 1])

            const sql3 = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
                        VALUES (?,?,?,?,?,?)`
            const [resultado3] = await conexion.query(sql3, [asunto, descripcion, fechaCreado,  resultado2.insertId, resultado[0].idReclamoTipo, idUsuarioCreador])

            return resultado3
        } catch (error) {
            console.error('Error al agregar el reclamo:', error);
            throw new Error('Error al agregar el reclamo');
        }
    }

    obtenerReclamo = async (idUsuario) => {
        try {
            const sql = `SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, r.idReclamoEstado, r.idUsuarioFinalizador, re.activo FROM reclamos AS r INNER JOIN reclamosestado AS re ON r.idReclamoEstado = re.idReclamoEstado WHERE r.idUsuarioCreador = ? AND re.activo = 1;`
            const [resultado] = await conexion.query(sql, [idUsuario, 1])

            const sql2 = `SELECT * FROM reclamostipo WHERE activo = 1`
            const [resultado2] = await conexion.query(sql2)
            if (resultado2.length === 0) {
                console.log('Todavia no se agregaron tipos de reclamos')
            } else {
                const resultados = {resultado: resultado, resultado2: resultado2}
                return resultados
            }
        } catch (error) {
            console.log('Error al obtener el reclamo: ', error)
            throw new Error('Error al obtener el reclamo')
        }
    }

    cancelarReclamo = async (idReclamoEstado) => {
        try {
            const sql = `UPDATE reclamosestado SET descripcion = ?, activo = ? WHERE idReclamoEstado = ?`
            const [resultado] = await conexion.query(sql, ['Cancelado', 3, idReclamoEstado])

            if (resultado.affectedRows === 0) {
                console.log('No se pudo modificar los datos del reclamo')
                throw new Error('No se pudo modificar los datos del reclamo')
            }
        } catch (error) {
            console.log('Error al cancelar el reclamo: ', error)
            throw new Error('Error al cancelar el reclamo')
        }
    }
}