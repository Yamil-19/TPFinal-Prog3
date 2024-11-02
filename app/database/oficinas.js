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

    obtenerUsuarios = async (idOficina) => {
        try {
            const sql = `SELECT * FROM usuariosOficinas WHERE idOficina = ?`
            const [resultado] = await conexion.query(sql, [idOficina])

            return resultado
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    }
    
    activo = async (valor, idUsuario) => {
        console.log(valor, idUsuario)
        const [resultado] = await conexion.query(`UPDATE usuariosOficinas SET activo = ? WHERE idUsuario = ?`, [valor, idUsuario]);
        if (resultado.affectedRows === 0) {
            return { 
                estado: 500, 
                mensaje: 'No se pudo modificar el activo del usuario oficina' 
            };
        }
        return resultado
    }
    agregarUsuarioOficina = async (usuario, idOficina) => {
        try {
            await conexion.query(`INSERT INTO usuariosOficinas (idUsuario, idOficina) VALUES (?, ?)`, [usuario, idOficina]);
            await conexion.query(`UPDATE usuarios SET idUsuarioTipo = 2 WHERE idUsuario = ${usuario}`);
            
            const [resultado] = await conexion.query('SELECT * FROM usuariosOficinas WHERE idOficina = ?', [idOficina])
            return resultado;
        } catch (error) {
            console.error('Error en agregar empleados:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    // agregarUsuarioOficina = async (usuarios, idOficina) => {
    //     try {
    //         const sql = `SELECT * FROM usuariosOficinas WHERE idOficina = ?`;
    //         const [listaEmpleados] = await conexion.query(sql, [idOficina]);

    //         for (const e of listaEmpleados) {
    //             if (!usuarios.includes(e.idUsuario)) {
    //                 await conexion.query(`UPDATE usuariosOficinas SET activo = 0 WHERE idUsuarioOficina = ?`, [e.idUsuarioOficina]);
    //             }
    //         }
          
    //         for (const u of usuarios) {
    //             const empleado = listaEmpleados.find(e => e.idUsuario === u);

    //             if (empleado){
    //                 if(empleado.activo === 0) {
    //                     await conexion.query(`UPDATE usuariosOficinas SET activo = 1 WHERE idUsuarioOficina = ?`, [empleado.idUsuarioOficina]);
    //                 }
    //             } else {
    //                 await conexion.query(`INSERT INTO usuariosOficinas (idUsuario, idOficina, activo) VALUES (?, ?, 1)`, [u, idOficina]);
    //                 await conexion.query(`UPDATE usuarios SET idUsuarioTipo = 2 WHERE idUsuario = ${u}`);
    //             }
    //         }

    //         const [resultado] = await conexion.query('SELECT * FROM usuariosOficinas WHERE idOficina = ?', [idOficina])
    //         return resultado;
    //     } catch (error) {
    //         console.error('Error en agregar empleados:', error);
    //         return { 
    //             estado: 500, 
    //             mensaje: `Error en el servidor ${error}` 
    //         };
    //     }
    // };
}