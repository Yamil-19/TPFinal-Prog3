import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const conexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '2024.reclamos',
    database: process.env.DB_NAME,
    port: process.env.DB_PUERTO
});

// Función para probar la conexión
// export async function probarConexion() {
//     try {
//         await conexion.connect();
//         console.log("Conexión exitosa a la base de datos.");
//     } catch (error) {
//         console.error("Error de conexión:", error);
//     }
// }