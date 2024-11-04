import { conexion } from "./conexion.js";

export default class Reclamos {   
    obtenerTodos = async (idUsuarioTipo, id) => {
        try {
            let sql = `SELECT * FROM reclamos `;
            
            if (idUsuarioTipo === 2) {
                sql += `WHERE idReclamoTipo = ?`;
            }

            if (idUsuarioTipo === 3) {
                sql += `WHERE idUsuarioCreador = ?`;
            }

            const [resultado] = await conexion.query(sql, [id]);
            return resultado;
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };
    
    obtenerPorId = async (id) => {
        try {
            const sql = `SELECT * FROM reclamos WHERE idReclamo = ?;`;
            const [resultado] = await conexion.query(sql, [id]);
           
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
    };

    agregar = async (datos) => {
        try {
            const sql = `INSERT INTO reclamos SET ?;`;
            const [resultado] = await conexion.query(sql, [datos]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el reclamo' 
                };
            } 

            return await conexion.query('SELECT * FROM reclamos WHERE idReclamo = ?', [resultado.insertId]);
        } catch (error) {
            console.error('Error en agregar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    modificar = async (id, datos) => {
        try {
            const sql = `UPDATE reclamos SET ? WHERE idReclamo = ?`;
            const [resultado] = await conexion.query(sql, [datos, id]);

            if (resultado.affectedRows === 0) {
                return { 
                    estado: 500, 
                    mensaje: 'No se pudo agregar el reclamo' 
                };
            } 

            return await conexion.query('SELECT * FROM reclamos WHERE idReclamo = ?', [id]);
        } catch (error) {
            console.error('Error en agregar:', error);
            return { 
                estado: 500, 
                mensaje: `Error en el servidor ${error}` 
            };
        }
    };

    buscarDatosReportePdf = async () => {        
        const sql = 'CALL `datosPDF`()';

        const [result] = await conexion.query(sql);
        console.log(result)

        const datosReporte = {
            reclamosTotales : result[0][0].reclamosTotales,
            reclamosNoFinalizados : result[0][0].reclamosNoFinalizados,
            reclamosFinalizados : result[0][0].reclamosFinalizados,
            descripcionTipoRreclamoFrecuente : result[0][0].descripcionTipoRreclamoFrecuente,
            cantidadTipoRreclamoFrecuente : result[0][0].cantidadTipoRreclamoFrecuente
        }

        return datosReporte;
    }

    buscarDatosReporteCsv = async () => {
        const sql = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado',
                     DATE_FORMAT(r.fechaCreado, '%Y-%m-%d %H:%i:%s') AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                    FROM reclamos AS r 
                    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo 
                    INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado 
                    INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        WHERE r.idReclamoEstado <> 4;`;

        const [result] = await conexion.query(sql);
        return result;
    }

}