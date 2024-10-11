import { conexion } from "./conexion.js";

export default class Cliente {

    crearReclamo = async ({tipo, asunto, descripcion, fechaCreado, idUsuarioCreador}) => {
        try {
            const sql = `SELECT idReclamoTipo from reclamostipo WHERE descripcion = ?`
            const [resultado] = await conexion.query(sql, [tipo])
            
            const sql2 = `INSERT INTO reclamosestado (descripcion, activo) VALUES (?,?)`
            const [resultado2] = await conexion.query(sql2, ['creado', 1])

            const sql3 = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
                        VALUES (?,?,?,?,?,?)`
            const [resultado3] = await conexion.query(sql3, [asunto, descripcion, fechaCreado,  resultado2.insertId, resultado[0].idReclamoTipo, idUsuarioCreador])

            return resultado3
        } catch (error) {
            console.error('Error al crear el reclamo:', error);
            throw new Error('Error al crear el reclamo');
        }
    }

    obtenerReclamo = async (idUsuario) => {
        try {
            const sql = `SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, r.idReclamoEstado, r.idUsuarioFinalizador, re.activo FROM reclamos AS r INNER JOIN reclamosestado AS re ON r.idReclamoEstado = re.idReclamoEstado WHERE r.idUsuarioCreador = ? AND re.activo = 1;`
            const [resultado] = await conexion.query(sql, [idUsuario, 1])

            const sql2 = `SELECT * FROM reclamostipo WHERE activo = 1`
            const [resultado2] = await conexion.query(sql2)
            if (resultado2.length === 0) {
                console.log('Todavia no se agregaron tipos de reclamos')
            } else {
                const resultados = {resultado: resultado, resultado2: resultado2}
                return resultados
            }
        } catch (error) {
            console.log('Error al obtener el reclamo: ', error)
            throw new Error('Error al obtener el reclamo')
        }
    }

    cancelarReclamo = async (idReclamoEstado) => {
        try {
            const sql = `UPDATE reclamosestado SET descripcion = ?, activo = ? WHERE idReclamoEstado = ?`
            const [resultado] = await conexion.query(sql, ['Cancelado', 3, idReclamoEstado])

            if (resultado.affectedRows === 0) {
                console.log('No se pudo modificar los datos del reclamo')
                throw new Error('No se pudo modificar los datos del reclamo')
            }
        } catch (error) {
            console.log('Error al cancelar el reclamo: ', error)
            throw new Error('Error al cancelar el reclamo')
        }
    }
}