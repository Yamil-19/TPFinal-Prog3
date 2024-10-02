import mysql from 'mysql2/promise'
import dotenv from "dotenv";
import bcryptjs from "bcryptjs" 

dotenv.config();

export default class Usuario {

    constructor() {
        this.initConnection();
    }

    async initConnection() {
        try {
            this.conexion = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: '',
                database: process.env.DB_NAME
            })
        } catch (error) {
            throw new Error("No se pudo establecer conexión con la Base de Datos.")
        }
    }
    

    obtenerId = async ({nombre, contrasenia}) => {
        const sql = 'SELECT contrasenia, idUsuario FROM usuarios WHERE nombre = ?';
        const [resultado] = await this.conexion.query(sql, [nombre])
        if (resultado.length === 0) {
            console.log('Usuario no encontrado')
            return res.send('Usuario no encontrado');
        }

        const contraseñaAlmacenada = resultado[0].contrasenia;
        const idUsuario = resultado[0].idUsuario

        const contraCorrecta= await bcryptjs.compare(contrasenia, contraseñaAlmacenada)
        if (contraCorrecta) {
            return idUsuario
        } else {
            console.log('Contraseña incorrecta')
        };  
    }

    findById = async (usuarioId) => {

        const sql = `SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia FROM usuarios WHERE idUsuario = ?`

        const [rows] = await this.conexion.query(sql, [usuarioId])
        console.log(rows)

        return (rows.length > 0)? rows[0] : null;
    }

    register = async ({nombre, apellido, correoElectronico, descripcion, contrasenia, imagen, activo}) => {
        try {
            
            const sql = `INSERT INTO usuariosTipo (descripcion, activo) VALUES (?,?)`
            const sql2 = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) 
            VALUES (?,?,?,?,?,?,?)`

            const salt = await bcryptjs.genSalt(5)
            const constraseñaHasheada = await bcryptjs.hash(contrasenia, salt)
                            
            const [resultado] = await this.conexion.query(sql, [descripcion, activo])
            
            const idTipoUsuario = resultado.insertId;
                
            const [resultado2] = await this.conexion.query(sql2, [nombre, apellido, correoElectronico, constraseñaHasheada, idTipoUsuario, imagen, activo])

            
            const [rows] = await this.conexion.query('SELECT LAST_INSERT_ID() AS idUsuario');
    
            return await this.findById(rows[0].idUsuario);

        } catch (error) {
            console.error('Error en el registro:', error);
            throw new Error('Error al registrar el usuario');
        }
    }

    iniciarSesion = async ({nombre, contrasenia}) => {
        const sql = 'SELECT contrasenia, idTipoUsuario FROM usuarios WHERE nombre = ?';
        const sql2 = 'SELECT descripcion FROM usuariostipo WHERE idUsuarioTipo = ?';

        const [resultado] = await this.conexion.query(sql, [nombre])
            
        if (resultado.length === 0) {
            console.log('Usuario no encontrado')
            return res.send('Usuario no encontrado');
        }
            
        const contraseñaAlmacenada = resultado[0].contrasenia;
        const idUsuarioTipo = resultado[0].idTipoUsuario
        
        const contraCorrecta= await bcryptjs.compare(contrasenia, contraseñaAlmacenada)
        
        if (contraCorrecta) {
            const [resultado2] = await this.conexion.query(sql2, [idUsuarioTipo])
            
            const descripcion = resultado2[0].descripcion
            if (descripcion === 'Cliente') {
                return '/api/cliente'
            }
            if (descripcion === 'Empleado') {
                return '/api/empleado'
            }
            if (descripcion === 'Administrador') {
                return '/api/administrador'
            }
        } else {
            console.log('Contraseña incorrecta')
        };  
    }
    
    crearReclamo = async ({asunto, descripcion, activo, fechaCreado, idUsuarioCreador}) => {
        try {
            const sql = `INSERT INTO reclamosestado (descripcion, activo) VALUES (?,?)`
            const sql2 = `INSERT INTO reclamosTipo (descripcion, activo) VALUES (?,?)`
            const sql3 = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
                        VALUES (?,?,?,?,?,?)`

            const [resultado] = await this.conexion.query(sql, ['Creado', activo])
            const [resultado2] = await this.conexion.query(sql2, [descripcion, activo])
            
            const idReclamoEstado = resultado.insertId
            const idReclamoTipo = resultado2.insertId
            const [resultado3] = await this.conexion.query(sql3, [asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador])
            
        } catch (error) {
            console.error('Error al crear el reclamo:', error);
            throw new Error('Error al crear el reclamo');
        }
    }

    obtenerReclamo = async (idUsuario) => {
        try {
            const sql = `SELECT asunto, descripcion, fechaCreado, fechaFinalizado, fechaCancelado, idUsuarioFinalizador, idReclamoEstado FROM reclamos WHERE idUsuarioCreador = ?`
            const sql2 = `SELECT descripcion, activo FROM reclamosestado WHERE idReclamoEstado = ?`
            const [resultado] = await this.conexion.query(sql, [idUsuario])
            // console.log(resultado[0].idReclamoEstado)
            const [resultado2] = await this.conexion.query(sql2, [resultado[0].idReclamoEstado])

            return resultado

        } catch (error) {
            console.log('Error al obtener el reclamo: ', error)
            throw new Error('Error al obtener el reclamo')
        }
    }
}
