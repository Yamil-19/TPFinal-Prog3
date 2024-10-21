import { conexion } from "./conexion.js";

export default class Clientes {

    

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