import { conexion } from "./conexion.js";

export default class Empleados {
    
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM usuarios WHERE idUsuarioTipo = 2`
            const [resultado] = await conexion.query(sql)
            return resultado
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM usuarios WHERE idUsuario = ? AND idUsuarioTipo = 2;`;
            const [resultado] = await conexion.query(sql, [id]);

            if (resultado.length === 0) {
                return null;
            }

            return resultado[0];
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
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
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el empleado' 
                };
            }
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
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
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo modificar el empleado' 
                };
            }
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    }
    
}