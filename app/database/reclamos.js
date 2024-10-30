import { conexion } from "./conexion.js";
import ApiError from "../utils/manejoDeErrores.js";

export default class Reclamos {   
    obtenerTodos = async (idUsuarioTipo, id) => {
        try {
            let sql = `SELECT * FROM reclamos `;
            
            if (idUsuarioTipo === 2) {
                sql += `WHERE idReclamoTipo = ?`;
            }

            if (idUsuarioTipo === 3) {
                sql += `WHERE idUsuarioCreador = ?`;
            }

            const [resultado] = await conexion.query(sql, [id]);
            return resultado;
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorIdReclamo = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idReclamo = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
            if (resultado.length === 0) {
                throw new ApiError('ID no encontrado', 404);
            } else {
                return resultado;
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError('Error en el servidor', 500);
            }
        }
    }
    obtenerPorIdReclamoEstado = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idReclamoEstado = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
            if (resultado.length === 0) {
                throw new ApiError('ID no encontrado', 404);
            } else {
                return resultado;
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError('Error en el servidor', 500)
            }
        }
    }
    obtenerPorIdReclamoTipo = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idReclamoTipo = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
            if (resultado.length === 0) {
                throw new ApiError('ID no encontrado', 404);
            } else {
                return resultado;
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError('Error en el servidor', 500);
            }
        }
    }
    obtenerPorIdUsuarioCreador = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idUsuarioCreador = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
            if (resultado.length === 0) {
                throw new ApiError('ID no encontrado', 404);
            } else {
                return resultado;
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError('Error en el servidor', 500);
            }
        }
    }

    agregar = async (datos) => {
        try {
            const sql = `INSERT INTO reclamos SET ?;`;
            const [resultado] = await conexion.query(sql, [datos]);

            if (resultado.affectedRows === 1) {
                const [nuevoReclamo] = await conexion.query(`SELECT * FROM reclamos WHERE idReclamo = ?`, [resultado.insertId]);
                return nuevoReclamo[0];
            } else {
                throw new ApiError('No se pudo agregar el reclamo', 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError('Error en el servidor', 500);
            }
        }
    }

    modificar = async (id, datos) => {
        try {
            const sql = `UPDATE reclamos SET ? WHERE idReclamo = ?`;
            const [resultado] = await conexion.query(sql, [datos, id]);

            if (resultado.affectedRows === 1) {
                const [reclamo] = await conexion.query(`SELECT * FROM reclamos WHERE idReclamo = ?`, [id]);
                return reclamo[0];
            } else {
                throw new ApiError('No se pudo modificar el reclamo', 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError('Error en el servidor', 500);
            }
        }
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