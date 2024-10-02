import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from 'path';
import { fileURLToPath } from "url";

import { router as v1Router } from './v1/routes/routes.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))


app.use('/api/', v1Router)
app.use('/api/v1', v1Router)

const puerto = process.env.PUERTO || 3000

app.listen(puerto, () => {
    console.log(`servidor corriendo en http://localhost:${puerto}/api`)
})
