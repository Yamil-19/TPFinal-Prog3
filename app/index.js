///////////// IMPORTACIONES /////////////////
import express from "express"; //Framework que se usa paraconstruir la API
import dotenv from "dotenv"; // variables de entorno
import cookieParser from "cookie-parser"; // middleware que facilita la lectura de las cookies en las peticiones HTTP

import path from 'path';
import { fileURLToPath } from "url";

import { router as v1Router } from './v1/routes/routes.js'; // importa las rutas definidad en otro archivo

///////////// IMPORTACIONES /////////////////

const app = express();
// crea una instancia de la aplicación express que se va a usar para definir la configuración del servidor y las rutas


const __dirname = path.dirname(fileURLToPath(import.meta.url));
// esta linea obtiene el directorio en el que se encuentra este archivo.

dotenv.config();
// trae las variables definidas en el archivo dotenv

app.use(express.json()); // permite que el servidor entienda las solicitudes con un cuerpo en formato JSON
app.use(cookieParser()); // permite analizar las cookies de de las peticiones y acceder a ellas desde req.cookies
app.use(express.static(__dirname + '/public')); //permite servir archivos estáticos desde el directorio public. La ruta a la carpeta public se obtiene usando __dirname


app.use('/api/', v1Router); // estas lineas definen las rutas de la api, cualquier peticion que empiece con /api/ se enviará a través del enrutador v1Router
app.use('/api/v1', v1Router);

const puerto = process.env.PUERTO || 3000

app.listen(puerto, () => {
    console.log(`servidor corriendo en http://localhost:${puerto}/api`)
});
    