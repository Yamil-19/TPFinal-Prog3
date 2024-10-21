import { conexion } from "./conexion.js";
import ApiError from "../utils/manejoDeErrores.js";

export default class ReclamosEstados {
    
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM reclamosestado`
            const [resultado] = await conexion.query(sql)
            return resultado
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM reclamosestado WHERE idReclamoEstado = ?;`;
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

    agregar = async (descripcion) => {
        try {
            const sql = `INSERT INTO reclamosestado (descripcion, activo) VALUES (?,1);`;
            const [resultado] = await conexion.query(sql, [descripcion]);

            if (resultado.affectedRows === 1) {
                const [nuevoReclamoEstado] = await conexion.query(`SELECT * FROM reclamosestado WHERE idReclamoEstado = ?`, [resultado.insertId]);
                return nuevoReclamoEstado[0];
            } else {
                throw new ApiError('No se pudo agregar el reclamoEstado', 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            } else {
                throw new ApiError('Error en el servidor', 500)
            }
        }
    }

    modificar = async (id, descripcion) => {
        try {
            const sql = `UPDATE reclamosestado SET ? WHERE idReclamoEstado = ?`;
            const [resultado] = await conexion.query(sql, [descripcion, id]);

            if (resultado.affectedRows === 1) {
                const [reclamoEstado] = await conexion.query(`SELECT * FROM reclamosestado WHERE idReclamoEstado = ?`, [id]);
                return reclamoEstado[0];
            } else {
                throw new ApiError('No se pudo modificar el reclamoEstado', 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            } else {
                throw new ApiError('Error en el servidor', 500)
            }
        }
    }
}