import express from 'express';
import dotenv from 'dotenv';

import {router as reclamosRouter} from './routes/reclamosRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.json({'estado':true});
// });

app.use('/reclamos', reclamosRouter);

const puerto = process.env.PUERTO;
app.listen(puerto, async () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
