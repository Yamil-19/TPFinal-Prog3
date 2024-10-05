import { conexion } from "./conexion.js";

export default class Cliente {

    crearReclamo = async ({idTipo, asunto, descripcion, fechaCreado, idUsuarioCreador}) => {
        try {
            const sql3 = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
                        VALUES (?,?,?,?,?,?)`
            const [resultado3] = await conexion.query(sql3, [asunto, descripcion, fechaCreado, 1, idTipo, idUsuarioCreador])

            return resultado3
        } catch (error) {
            console.error('Error al crear el reclamo:', error);
            throw new Error('Error al crear el reclamo');
        }
    }

    obtenerReclamo = async (idUsuario) => {
        try {
            const sql = `SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, r.idReclamoEstado, r.idUsuarioFinalizador, re.activo FROM reclamos AS r INNER JOIN reclamosestado AS re ON r.idReclamoEstado = re.idReclamoEstado WHERE r.idUsuarioCreador = ? AND re.activo = ?;`
            const [resultado] = await conexion.query(sql, [idUsuario, 1])
            return resultado
        } catch (error) {
            console.log('Error al obtener el reclamo: ', error)
            throw new Error('Error al obtener el reclamo')
        }
    }

    cancelarReclamo = async (idReclamoEstado) => {
        try {
            const sql = `UPDATE reclamosestado SET descripcion = ?, activo = ? WHERE idReclamoEstado = ?`
            const sql2 = `UPDATE reclamostipo SET activo = ? WHERE idReclamoTipo = ?`
            const [resultado] = await conexion.query(sql, ['Cancelado', 3, idReclamoEstado])
            const [resultado2] = await conexion.query(sql2, [0, idReclamoEstado])
            if (resultado.affectedRows === 0 || resultado2.affectedRows === 0) {
                console.log('No se pudo modificar los datos del reclamo')
                throw new Error('No se pudo modificar los datos del reclamo')
            }
        } catch (error) {
            console.log('Error al cancelar el reclamo: ', error)
            throw new Error('Error al cancelar el reclamo')
        }
    }
}