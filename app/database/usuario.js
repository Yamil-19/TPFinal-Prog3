import bcryptjs from "bcryptjs" 
import { conexion } from './conexion.js';
import ApiError from "../utils/manejoDeErrores.js";

export default class Usuarios {
    obtenerTodos = async () => {
        try {
            const sql = `SELECT * FROM usuarios;`;
            const [resultado] = await conexion.query(sql);
            return resultado;
        } catch (error) {
            throw new Error('Error en el servidor');
        }
    }
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM usuarios WHERE idUsuario = ?;`;
            const [resultado] = await conexion.query(sql, [id]);

            if (resultado.length === 0) {
                throw new ApiError('ID no encontrado', 404);
            } else {
                return resultado[0]
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
            const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, activo) VALUES (?,?,?,?,?,1);`;
            const [resultado] = await conexion.query(sql, [datos.nombre, datos.apellido, datos.correoElectronico, datos.contrasenia, datos.idUsuarioTipo]);

            if (resultado.affectedRows === 1) {
                const [nuevoUsuario] = await conexion.query(`SELECT * FROM usuarios WHERE idUsuario = ?`, [resultado.insertId]);
                return nuevoUsuario[0];
            } else {
                throw new ApiError('No se pudo agregar el usuario', 500);
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
                throw new ApiError('No se pudo modificar el usuario', 500);
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

    obtenerPorEmail = async (email) => {
        const sql = `SELECT * FROM usuarios WHERE correoElectronico = ?;`;
        const [resultado] = await conexion.query(sql, [email]);
        return resultado[0]
    }

    iniciarSesion = async (correoElectronico, contrasenia) => {
        const sql = `SELECT * FROM usuarios WHERE correoElectronico = ? AND contrasenia = ? AND activo = 1;`;
        const resultado = await conexion.query(sql, [correoElectronico, contrasenia])
        console.log(resultado[0])
        return resultado[0]
    }













      

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

    // obtenerPorIdUsuarioTipo = async (idUsuarioTipo) => {
    //     try {
    //         const sql = `SELECT * FROM usuariostipo WHERE idUsuarioTipo = ?;`;
    //         const [resultado] = await conexion.query(sql, [idUsuarioTipo]);

    //         if (resultado.length === 0) {
    //             throw new ApiError('ID no encontrado', 404);
    //         } else {
    //             return resultado
    //         }
    //     } catch (error) {
    //         if (error instanceof ApiError) {
    //             throw error
    //         } else {
    //             throw new ApiError('Error en el servidor', 500)
    //         }
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
