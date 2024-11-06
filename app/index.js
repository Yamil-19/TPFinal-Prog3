import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./middlewares/passport.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

import path from 'path';
import { fileURLToPath } from "url";

import { router as v1AppWebRouter } from "./v1/routes/appWeb.js";
import { router as v1EmpleadosRouter } from "./v1/routes/empleadosRoutes.js";
import { router as v1OficinasRouter } from "./v1/routes/oficinasRoutes.js";
import { router as v1ReclamosEstadosRouter } from "./v1/routes/reclamosEstadosRoutes.js";
import { router as v1ReclamosRouter } from "./v1/routes/reclamosRoutes.js";
import { router as v1ReclamosTiposRouter } from "./v1/routes/reclamosTiposRoutes.js";
import { router as v1UsuariosRouter } from "./v1/routes/usuariosRoutes.js";
import { router as v1AuthRouter } from "./v1/routes/authRoutes.js";



const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config();
const puerto = process.env.PUERTO || 3000

app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

app.use(passport.initialize())

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST - Programación 3 - 2024',
            version: '1.0.0',
            description: 'API REST para la gestión de reclamos de la concesionaria de automóviles Prog.III. '
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
        },
        security: [
            {
              bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['app/v1/routes/*.js'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/auth', v1AuthRouter)

app.use('/', v1AppWebRouter)

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


app.listen(puerto, () => {
    console.log(`servidor corriendo en http://localhost:${puerto}`)
})
