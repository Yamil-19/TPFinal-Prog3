import { conexion } from "./conexion.js";

export default class Administrador {
    obtenerReclamosTipo = async () => {
        try {
            const sql = `SELECT * FROM reclamostipo`
            const [resultado] = await conexion.query(sql)
            return resultado
        } catch (error) {
            console.log('Error al obtener el reclamo: ', error)
            throw new Error('Error al obtener el reclamo')
        }
    }

    cancelarReclamo = async (idReclamoEstado) => { // <-----
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