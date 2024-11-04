import { conexion } from "./conexion.js";

export default class Oficinas {
    
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM oficinas`
            const [resultado] = await conexion.query(sql)

            return resultado
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM oficinas WHERE idOficina = ?;`;
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
            const sql = `INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,1);`;
            const [resultado] = await conexion.query(sql, [datos.nombre, datos.idReclamoTipo]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar la oficina' 
                };
            } 

            return await conexion.query('SELECT * FROM oficinas WHERE idOficina = ?', [resultado.insertId]);
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
            const sql = `UPDATE oficinas SET ? WHERE idOficina = ?`;
            const [resultado] = await conexion.query(sql, [datos, id]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo modificar la oficina' 
                };
            }

            return await conexion.query('SELECT * FROM oficinas WHERE idOficina = ?', [id]);
        } catch (error) {
            console.error('Error en modificar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
}