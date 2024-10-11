import bcryptjs from "bcryptjs" 
import { conexion } from './conexion.js';
import Cliente  from "./db_cliente.js";


export default class Usuario {
    constructor() {
        this.cliente = new Cliente()
    }

    obtenerDatos = async ({nombre, contrasenia}) => {
        try {
            const sql = `SELECT u.contrasenia, u.idUsuario, u.correoElectronico, ut.descripcion FROM usuarios AS u INNER JOIN usuariosTipo AS ut ON u.idTipoUsuario = ut.idUsuarioTipo WHERE u.nombre = ?`
            const [resultado] = await conexion.query(sql, [nombre])
            // console.log(resultado)
            
            if (resultado.length === 0) {
                console.log('Usuario no encontrado')
                return res.send('Usuario no encontrado');
            }
    
            const contraseñaAlmacenada = resultado[0].contrasenia;
            const idUsuario = resultado[0].idUsuario
            const descripcion = resultado[0].descripcion
            const correoElectronico = resultado[0].correoElectronico
    
            const contraCorrecta= await bcryptjs.compare(contrasenia, contraseñaAlmacenada)
            if (contraCorrecta) {
                return {idUsuario: idUsuario, descripcion: descripcion, correoElectronico: correoElectronico}
            } else {
                console.log('Contraseña incorrecta')
            };  
        } catch (error) {
            console.log('Error al obtener el ID')
            throw new Error("Error al obtener el ID");
            
        }
    }

    findById = async (usuarioId) => {

        const sql = `SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia FROM usuarios WHERE idUsuario = ?`

        const [rows] = await conexion.query(sql, [usuarioId])

        return (rows.length > 0)? rows[0] : null;
    }

    register = async ({nombre, apellido, correoElectronico, descripcion, contrasenia, imagen, activo}) => {
        try {
            
            const sql = `INSERT INTO usuariosTipo (descripcion, activo) VALUES (?,?)`
            const sql2 = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) 
            VALUES (?,?,?,?,?,?,?)`

            const salt = await bcryptjs.genSalt(5)
            const constraseñaHasheada = await bcryptjs.hash(contrasenia, salt)
                            
            const [resultado] = await conexion.query(sql, [descripcion, activo])
            
            const idTipoUsuario = resultado.insertId;
                
            const [resultado2] = await conexion.query(sql2, [nombre, apellido, correoElectronico, constraseñaHasheada, idTipoUsuario, imagen, activo])

            const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS idUsuario');
    
            return await this.findById(rows[0].idUsuario);

        } catch (error) {
            console.error('Error en el registro:', error);
            throw new Error('Error al registrar el usuario');
        }
    }
    
    iniciarSesion = async ({nombre, contrasenia}) => {
        const sql = `SELECT u.contrasenia, ut.descripcion FROM usuarios AS u INNER JOIN usuariosTipo AS ut ON u.idTipoUsuario = ut.idUsuarioTipo WHERE u.nombre = ?`

        const [resultado] = await conexion.query(sql, [nombre])
        // console.log(resultado)
            
        if (resultado.length === 0) {
            console.log('Usuario no encontrado')
        }
            
        const contraseñaAlmacenada = resultado[0].contrasenia;

        // console.log(contraseñaAlmacenada)
        const contraCorrecta= await bcryptjs.compare(contrasenia, contraseñaAlmacenada)
        // console.log(contraCorrecta)
        
        if (contraCorrecta) {
            if (resultado[0].descripcion === 'Cliente') {
                return '/api/cliente'
            }
            if (resultado[0].descripcion === 'Empleado') {
                return '/api/empleado'
            }
            if (resultado[0].descripcion === 'Administrador') {
                return '/api/administrador'
            }
        } else {
            console.log('Contraseña incorrecta')
        };  
    }
    
    actualizarPerfil = async (usuarioActualizado, idUsuario) => {
        try {
            const sql = `UPDATE usuarios SET ? WHERE idUsuario = ?`
            const [resultado] = await conexion.query(sql, [usuarioActualizado, idUsuario])
           
            if (resultado.affectedRows === 0) {
                console.log('No se pudo modificar el perfil')
            }
            return resultado

        } catch (error) {
                console.log('Error al actualizar el perfil: ', error)
                throw new Error('Error al actualizar el perfil')
         }
    }
}
