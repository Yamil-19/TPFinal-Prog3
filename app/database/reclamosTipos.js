import { conexion } from "./conexion.js";
import ApiError from "../utils/manejoDeErrores.js";

export default class ReclamosTipos {
    
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM reclamostipo`
            const [resultado] = await conexion.query(sql)
            return resultado
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM reclamostipo WHERE idReclamoTipo = ?;`;
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
            const sql = `INSERT INTO reclamostipo (descripcion, activo) VALUES (?,1);`;
            const [resultado] = await conexion.query(sql, [descripcion]);

            if (resultado.affectedRows === 1) {
                const [nuevoReclamoTipo] = await conexion.query(`SELECT * FROM reclamostipo WHERE idReclamoTipo = ?`, [resultado.insertId]);
                return nuevoReclamoTipo[0];
            } else {
                throw new ApiError('No se pudo agregar el reclamoTipo', 500);
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
            const sql = `UPDATE reclamostipo SET ? WHERE idReclamoTipo = ?`;
            const [resultado] = await conexion.query(sql, [descripcion, id]);

            if (resultado.affectedRows === 1) {
                const [reclamoTipo] = await conexion.query(`SELECT * FROM reclamostipo WHERE idReclamoTipo = ?`, [id]);
                return reclamoTipo[0];
            } else {
                throw new ApiError('No se pudo modificar el reclamoTipo', 500);
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