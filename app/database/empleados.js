import { conexion } from "./conexion.js";
import ApiError from "../utils/manejoDeErrores.js";

export default class Empleados {
    
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM usuarios WHERE idUsuarioTipo = 2`
            const [resultado] = await conexion.query(sql)
            return resultado
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM usuarios WHERE idUsuario = ? AND idUsuarioTipo = 2;`;
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
            const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, activo) VALUES (?,?,?,?,2,1);`;
            const [resultado] = await conexion.query(sql, [datos.nombre, datos.apellido, datos.correoElectronico, datos.contrasenia]);

            if (resultado.affectedRows === 1) {
                const [nuevoUsuario] = await conexion.query(`SELECT * FROM usuarios WHERE idUsuario = ?`, [resultado.insertId]);
                return nuevoUsuario[0];
            } else {
                throw new ApiError('No se pudo agregar el empleado', 500);
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
            const sql = `UPDATE usuarios SET ? WHERE idUsuario = ?`;
            const [resultado] = await conexion.query(sql, [datos, id]);

            if (resultado.affectedRows === 1) {
                const [usuario] = await conexion.query(`SELECT * FROM usuarios WHERE idUsuario = ?`, [id]);
                return usuario[0];
            } else {
                throw new ApiError('No se pudo modificar el empleado', 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            } else {
                throw new ApiError('Error en el servidor', 500)
            }
        }
    }
    
    verificarEmail = async (email) => {
        const sql = `SELECT * FROM usuarios WHERE correoElectronico = ?;`;
        const [resultado] = await conexion.query(sql, [email]);
        if (resultado.length === 1) {
            throw new ApiError(`El email ${email} ya está en uso`, 400);
        }
    }
}