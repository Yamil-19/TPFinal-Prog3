import { conexion } from "./conexion.js";

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
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
    obtenerIdReclamoTipo = async (idUsuario) => {
        try {
            const sql = `SELECT o.idReclamoTipo FROM oficinas AS o INNER JOIN usuarios_oficinas AS uo 
                        ON o.idOficina = uo.idOficina WHERE uo.idUsuario = ?;`;
            const [resultado] = await conexion.query(sql, [idUsuario])

            if (resultado.length === 0) {
                return null
            }
            return resultado[0].idReclamoTipo
        } catch (error) {
            console.error('Error en obtenerIdReclamoTipo:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    }

    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idReclamo = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
           
            if (resultado.length === 0) {
                return null;
            }

            return resultado[0];
        } catch (error) {
            console.error('Error en obtenerPorId:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    agregar = async (datos) => {
        try {
            const sql = `INSERT INTO reclamos SET ?;`;
            const [resultado] = await conexion.query(sql, [datos]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el reclamo' 
                };
            } 

            const [nuevoReclamo] = await conexion.query('SELECT * FROM reclamos WHERE idReclamo = ?', [resultado.insertId]);
            return nuevoReclamo[0]
        } catch (error) {
            console.error('Error en agregar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    modificar = async (id, datos) => {
        try {
            const sql = `UPDATE reclamos SET ? WHERE idReclamo = ?`;
            const [resultado] = await conexion.query(sql, [datos, id]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el reclamo' 
                };
            } 

            return await conexion.query('SELECT * FROM reclamos WHERE idReclamo = ?', [id]);
        } catch (error) {
            console.error('Error en agregar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

}