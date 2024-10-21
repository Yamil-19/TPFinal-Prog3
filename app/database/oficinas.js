import { conexion } from "./conexion.js";
import ApiError from "../utils/manejoDeErrores.js";

export default class Oficinas {
    
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM oficinas`
            const [resultado] = await conexion.query(sql)
            return resultado
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM oficinas WHERE idOficina = ?;`;
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
            const sql = `INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,1);`;
            const [resultado] = await conexion.query(sql, [datos.nombre, datos.idReclamoTipo]);

            if (resultado.affectedRows === 1) {
                const [nuevaOficina] = await conexion.query(`SELECT * FROM oficinas WHERE idOficina = ?`, [resultado.insertId]);
                return nuevaOficina[0];
            } else {
                throw new ApiError('No se pudo agregar la oficina', 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            } else {
                throw new ApiError('Error en el servidor', 500)
            }
        }
    }

    modificar = async (id, datos) => {
        try {
            const sql = `UPDATE oficinas SET ? WHERE idOficina = ?`;
            const [resultado] = await conexion.query(sql, [datos, id]);

            if (resultado.affectedRows === 1) {
                const [oficina] = await conexion.query(`SELECT * FROM oficinas WHERE idOficina = ?`, [id]);
                return oficina[0];
            } else {
                throw new ApiError('No se pudo modificar la oficina', 500);
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