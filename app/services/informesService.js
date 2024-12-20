import { createObjectCsvWriter } from 'csv-writer';
import puppeteer, { Browser } from "puppeteer";
import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class InformeService {
    
    informeReclamosCsv = async (datosReporte) => {
        const ruta = path.join(__dirname, '../pages/reclamos.csv'); 

        const csvWriter = createObjectCsvWriter({
            path: ruta, 
            header: [
                {id: 'reclamo', title: 'RECLAMO'},
                {id: 'tipo', title: 'TIPO'},
                {id: 'estado', title: 'ESTADO'},
                {id: 'fechaCreado', title: 'FECHA CREADO'},
                {id: 'cliente', title: 'CLIENTE'},
            ],
            encoding:'utf-8' 
        });

        await csvWriter.writeRecords(datosReporte);

        return ruta;
    }
 
    informeReclamosPdf = async (datosReporte) => {
        try{
            const filePath = path.join(__dirname, '../pages/handlebars/informe.hbs');
            const htmlTemplate = fs.readFileSync(filePath, 'utf8');

            const template = handlebars.compile(htmlTemplate);
            const htmlFinal = template(datosReporte);

            const browser = await puppeteer.launch();

            const page = await browser.newPage();

            await page.setContent(htmlFinal, {waitUntil: 'load'});

            const pdfBuffer = await page.pdf({
                format:'A4',
                printBackground: true,
                margin: {top: '10px', bottom: '10px', left: '50px', right: '50px' }
            });

            await browser.close();

            return pdfBuffer;

        }catch(error){
            console.error('Error generando el PDF:', error);
            throw error;
        }
    }

}