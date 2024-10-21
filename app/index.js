import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from 'path';
import { fileURLToPath } from "url";

import { router as v1AppWebRouter } from "./v1/routes/appWeb.js";
import { router as v1ClientesRouter } from "./v1/routes/clientesRoutes.js";
import { router as v1EmpleadosRouter } from "./v1/routes/empleadosRoutes.js";
import { router as v1OficinasRouter } from "./v1/routes/oficinasRoutes.js";
import { router as v1ReclamosEstadosRouter } from "./v1/routes/reclamosEstadosRoutes.js";
import { router as v1ReclamosRouter } from "./v1/routes/reclamosRoutes.js";
import { router as v1ReclamosTiposRouter } from "./v1/routes/reclamosTiposRoutes.js";
import { router as v1UsuariosRouter } from "./v1/routes/usuariosRoutes.js";

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))


app.use('/', v1AppWebRouter)

app.use('/api/clientes', v1ClientesRouter)
app.use('/api/v1/clientes', v1ClientesRouter)

app.use('/api/empleados', v1EmpleadosRouter)
app.use('/api/v1/empleados', v1EmpleadosRouter)

app.use('/api/oficinas', v1OficinasRouter)
app.use('/api/v1/oficinas', v1OficinasRouter)

app.use('/api/reclamosEstados', v1ReclamosEstadosRouter)
app.use('/api/v1/reclamosEstados', v1ReclamosEstadosRouter)

app.use('/api/reclamos', v1ReclamosRouter)
app.use('/api/v1/reclamos', v1ReclamosRouter)

app.use('/api/reclamosTipos', v1ReclamosTiposRouter)
app.use('/api/v1/reclamosTipos', v1ReclamosTiposRouter)

app.use('/api', v1UsuariosRouter)
app.use('/v1/api', v1UsuariosRouter)

const puerto = process.env.PUERTO || 3000

app.listen(puerto, () => {
    console.log(`servidor corriendo en http://localhost:${puerto}`)
})
