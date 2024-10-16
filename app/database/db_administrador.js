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

    modificarReclamoTipo = async(idReclamoTipo, descripcion, activo) => {
        try {
            const sql = `UPDATE reclamostipo SET descripcion = ?, activo = ? WHERE idReclamoTipo = ?`
            const [resultado] = await conexion.query(sql, [descripcion, activo, idReclamoTipo])
            if (resultado.affectedRows === 0) {
                console.log('No se pudo modificar el reclamoTipo')
            }
        } catch (error) {
            console.log('Error al cancelar el reclamo: ', error)
            throw new Error('Error al cancelar el reclamo')
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

    agregarReclamoTipo = async ({descripcion, activo}) => {
        try {
            const sql = `INSERT INTO reclamostipo (descripcion, activo) VALUES (?, ?)`
    
            const [resultado] = await conexion.query(sql, [descripcion, activo])
            console.log(resultado)
            return resultado
        } catch (error) {
            console.log('Error al crear el tipo de reclamo: ', error)
            throw new Error('Error al crear el tipo de reclamo')
        }
    }
}