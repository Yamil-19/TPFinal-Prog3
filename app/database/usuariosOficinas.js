import { conexion } from "./conexion.js";

export default class UsuariosOficinas {
    
    obtenerPorIdUsuarioOficina = async (idUsuarioOficina) => {
        try {
            const sql = `SELECT * FROM usuarios_oficinas WHERE idUsuarioOficina = ?;`;
            const [resultado] = await conexion.query(sql, [idUsuarioOficina]);

            if (resultado.length === 0) {
                return null;
            }

            return resultado[0];
        } catch (error) {
            console.error('Error en obtenerPorIdUsuarioOficina:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    obtenerPorIdUsuario = async (idUsuario) => {
        try {
            let sql = `SELECT * FROM usuarios_oficinas WHERE idUsuario = ?;`;

            const [resultado] = await conexion.query(sql, [idUsuario]);

            if (resultado.length === 0) {
                return null;
            }

            return resultado[0];
        } catch (error) {
            console.error('Error en obtenerPorIdUsuario:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    obtenerPorIdOficina = async (idOficina) => {
        try {
            const sql = `SELECT * FROM usuarios_oficinas WHERE idOficina = ?;`;
            const [resultado] = await conexion.query(sql, [idOficina]);

            if (resultado.length === 0) {
                return null;
            }

            return resultado;
        } catch (error) {
            console.error('Error en obtenerPorIdOficina:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    agregarEmpleados = async (lea, lem, idO) => {
        try {
            conexion.beginTransaction()

            if (lea) {
                for (const idea of lea) {
                    await conexion.query(`INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?, ?, 1);`, [idea, idO]);
                }
            }

            if (lem) {
                for (const idem of lem) {
                    await conexion.query(`UPDATE usuarios_oficinas SET idOficina = ?, activo = 1 WHERE idUsuario = ?;`, [idO, idem]);
                }
            }

            conexion.commit()

            return { mensaje: `Se agregaron exitosamente los empleados` }; // corregir mensaje
        } catch (error) {
            conexion.rollback()

            console.error('Error en agregarEmpleados:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        };
    };

    quitarEmpleados = async (idOficina, listaIdEmpleados) => {
        try {
            conexion.beginTransaction()

            for (const id of listaIdEmpleados) {
                await conexion.query(`UPDATE usuarios_oficinas SET activo = 0 WHERE idOficina = ? AND idUsuario = ?;`, [idOficina, id])
            }

            conexion.commit()

            return { mensaje: `Se quitaron exitosamente los empleados` }; // corregir mensaje
        } catch (error) {
            conexion.rollback()
            
            console.error('Error en quitarEmpleados:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        };
    }



    // agregar = async (datos) => {
    //     try {
    //         const sql = `INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,1);`;
    //         const [resultado] = await conexion.query(sql, [datos.nombre, datos.idReclamoTipo]);

    //         if (resultado.affectedRows === 0) {
    //             return { 
    //                 estado: 500, 
    //                 mensaje: 'No se pudo agregar la oficina' 
    //             };
    //         } 

    //         return await conexion.query('SELECT * FROM oficinas WHERE idOficina = ?', [resultado.insertId]);
    //     } catch (error) {
    //         console.error('Error en agregar:', error);
    //         return { 
    //             estado: 500, 
    //             mensaje: `Error en el servidor ${error}` 
    //         };
    //     }
    // };

    // modificar = async (id, datos) => {
    //     try {
    //         const sql = `UPDATE oficinas SET ? WHERE idOficina = ?`;
    //         const [resultado] = await conexion.query(sql, [datos, id]);

    //         if (resultado.affectedRows === 0) {
    //             return { 
    //                 estado: 500, 
    //                 mensaje: 'No se pudo modificar la oficina' 
    //             };
    //         }

    //         return await conexion.query('SELECT * FROM oficinas WHERE idOficina = ?', [id]);
    //     } catch (error) {
    //         console.error('Error en modificar:', error);
    //         return { 
    //             estado: 500, 
    //             mensaje: `Error en el servidor ${error}` 
    //         };
    //     }
    // };
}