import bcryptjs from "bcryptjs" 
import { conexion } from './conexion.js';

export default class Usuarios {
    obtenerTodos = async (idUsuarioTipo) => {
        try {
            // let sql = `SELECT * FROM usuarios `;
            let sql = `SELECT idUsuario, CONCAT(nombre, ' ', apellido) AS 'nombre completo', correoElectronico FROM usuarios `;
            if (idUsuarioTipo === 2)
                sql += `WHERE idUsuarioTipo = ?`
            const [resultado] = await conexion.query(sql, [idUsuarioTipo]);
            return resultado;
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    }
    
    obtenerPorId = async (idUsuario, idUsuarioTipo) => {
        try {
            let sql = `SELECT u.idUsuario, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idUsuarioTipo FROM usuarios AS u WHERE u.idUsuario = ? `;
            if (idUsuarioTipo === 2)
                sql += `AND u.idUsuarioTipo = ?`
            const [resultado] = await conexion.query(sql, [idUsuario, idUsuarioTipo]);

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
    }

    agregar = async (datos) => {
        try {
            const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, activo) VALUES (?,?,?,?,?,1);`;
            const [resultado] = await conexion.query(sql, [datos.nombre, datos.apellido, datos.correoElectronico, datos.contrasenia, datos.idUsuarioTipo]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el usuario' 
                };
            } 

            return `Se agregó correctamente el usuario ${resultado.insertId}`;
        } catch (error) {
            console.error('Error en agregar:', error);
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

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo modificar el usuario' 
                };
            }

            return `Se modificó correctamente el usuario ${resultado.insertId}`;
        } catch (error) {
            console.error('Error en modificar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
    obtenerPorEmail = async (email) => {
        try {
            const sql = `SELECT * FROM usuarios WHERE correoElectronico = ?;`;
            const [resultado] = await conexion.query(sql, [email]);

            if (resultado.length === 0) {
                return null;
            }

            return resultado[0];
        } catch (error) {
            console.error('Error en obtenerPorEmail:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    iniciarSesion = async (correoElectronico, contrasenia) => {
        try {
            const sql = `SELECT * FROM usuarios WHERE correoElectronico = ? AND contrasenia = ? AND activo = 1;`;
            const resultado = await conexion.query(sql, [correoElectronico, contrasenia])
            console.log(resultado[0]) // debug 
            return resultado[0]
        } catch (error) {
            console.error('Error en iniciarSesion:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };













      

    // obtenerDatos = async ({nombre, contrasenia}) => {
    //     try {
    //         const sql = `SELECT u.contrasenia, u.idUsuario, u.correoElectronico, ut.descripcion FROM usuarios AS u INNER JOIN usuariosTipo AS ut ON u.idTipoUsuario = ut.idUsuarioTipo WHERE u.nombre = ?`
    //         const [resultado] = await conexion.query(sql, [nombre])
    //         // console.log(resultado)
            
    //         if (resultado.length === 0) {
    //             console.log('Usuario no encontrado')
    //             return res.send('Usuario no encontrado');
    //         }
    
    //         const contraseñaAlmacenada = resultado[0].contrasenia;
    //         const idUsuario = resultado[0].idUsuario
    //         const descripcion = resultado[0].descripcion
    //         const correoElectronico = resultado[0].correoElectronico
    
    //         const contraCorrecta= await bcryptjs.compare(contrasenia, contraseñaAlmacenada)
    //         if (contraCorrecta) {
    //             return {idUsuario: idUsuario, descripcion: descripcion, correoElectronico: correoElectronico}
    //         } else {
    //             console.log('Contraseña incorrecta')
    //         };  
    //     } catch (error) {
    //         console.log('Error al obtener el ID')
    //         throw new Error("Error al obtener el ID");
            
    //     }
    // }


    // findById = async (usuarioId) => {

    //     const sql = `SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia FROM usuarios WHERE idUsuario = ?`

    //     const [rows] = await conexion.query(sql, [usuarioId])

    //     return (rows.length > 0)? rows[0] : null;
    // }

    // register = async ({nombre, apellido, correoElectronico, descripcion, contrasenia, imagen, activo}) => {
    //     try {
            
    //         const sql = `INSERT INTO usuariosTipo (descripcion, activo) VALUES (?,?)`
    //         const sql2 = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) 
    //         VALUES (?,?,?,?,?,?,?)`

    //         const salt = await bcryptjs.genSalt(5)
    //         const constraseñaHasheada = await bcryptjs.hash(contrasenia, salt)
                            
    //         const [resultado] = await conexion.query(sql, [descripcion, activo])
            
    //         const idTipoUsuario = resultado.insertId;
                
    //         const [resultado2] = await conexion.query(sql2, [nombre, apellido, correoElectronico, constraseñaHasheada, idTipoUsuario, imagen, activo])

    //         const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS idUsuario');
    
    //         return await this.findById(rows[0].idUsuario);

    //     } catch (error) {
    //         console.error('Error en el registro:', error);
    //         throw new Error('Error al registrar el usuario');
    //     }
    // }
    
    // iniciarSesion = async ({nombre, contrasenia}) => {
    //     const sql = `SELECT u.contrasenia, ut.descripcion FROM usuarios AS u INNER JOIN usuariosTipo AS ut ON u.idTipoUsuario = ut.idUsuarioTipo WHERE u.nombre = ?`

    //     const [resultado] = await conexion.query(sql, [nombre])
    //     // console.log(resultado)
            
    //     if (resultado.length === 0) {
    //         console.log('Usuario no encontrado')
    //     }
            
    //     const contraseñaAlmacenada = resultado[0].contrasenia;

    //     // console.log(contraseñaAlmacenada)
    //     const contraCorrecta= await bcryptjs.compare(contrasenia, contraseñaAlmacenada)
    //     // console.log(contraCorrecta)
        
    //     if (contraCorrecta) {
    //         return `/${resultado[0].descripcion.toLowerCase()}`

    //     } else {
    //         console.log('Contraseña incorrecta')
    //     };  
    // }
    
    // actualizarPerfil = async (datos, idUsuario) => {
    //     try {
    //         const sql = `UPDATE usuarios SET ? WHERE idUsuario = ?`
    //         const [resultado] = await conexion.query(sql, [datos, idUsuario])
           
    //         if (resultado.affectedRows === 0) {
    //             console.log('No se pudo modificar el perfil')
    //         }
    //         return resultado

    //     } catch (error) {
    //             console.log('Error al actualizar el perfil: ', error)
    //             throw new Error('Error al actualizar el perfil')
    //      }
    // }
}
