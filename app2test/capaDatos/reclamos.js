import {conexion} from "./conexion.js";

export default class Reclamos{
    
    // GET ALL
    buscarTodos = async (limit = 0, offset= 0) =>{
        let sql = `SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, 
                        r.idReclamoEstado, re.descripcion AS "Descripción Estado", 
                        r.idReclamoTipo, rt.descripcion AS "Descripción Tipo", 
                        u.nombre AS "Creado por"
                        FROM reclamos AS r
                        INNER JOIN reclamos_tipo AS rt ON rt.idReclamosTipo = r.idReclamoTipo
                        INNER JOIN reclamos_estado AS re ON re.idReclamosEstado = r.idReclamoEstado
                        INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador `
    if (limit) {
        sql += 'LIMIT ? OFFSET ?';
    }
    
    const [result] = await conexion.query(sql, [limit, offset]);
    return result;
    }
}