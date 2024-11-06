import { conexion } from "./conexion.js";

export default class ReclamosEstados {
    
    obtenerTodos = async () => {
        try {
            const sql = 'SELECT * FROM reclamos_estado';
            const [resultado] = await conexion.query(sql);

            return resultado;
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
            const sql = 'SELECT descripcion FROM reclamos_estado WHERE idReclamoEstado = ?';
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
    
    agregar = async (descripcion) => {
        try {
            const sql = 'INSERT INTO reclamos_estado (descripcion, activo) VALUES (?,1)';
            const [resultado] = await conexion.query(sql, [descripcion]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el reclamoEstado' 
                };
            } 

            return await conexion.query('SELECT * FROM reclamos_estado WHERE idReclamoEstado = ?', [resultado.insertId]);
        } catch (error) {
            console.error('Error en agregar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
    modificar = async (id, descripcion) => {
        try {
            const sql = 'UPDATE reclamos_estado SET descripcion = ? WHERE idReclamoEstado = ?';
            const [resultado] = await conexion.query(sql, [descripcion, id]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo modificar el reclamoEstado' 
                };
            }

            return await conexion.query('SELECT * FROM reclamos_estado WHERE idReclamoEstado = ?', [id]);
        } catch (error) {
            console.error('Error en modificar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
}