import ReclamosService from "../service/reclamosService.js";

export default class ReclamosController {
    constructor() {
        this.reclamosService = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        //Paginacion
        const limit = req.body.limit;
        const offset = req.body.offset;


        try {
            //Si no están definidos limit y offset no hago paginación
            let pLimit = limit ? Number(limit) : 0;
            let pOffset = offset ? Number(offset) : 0;

            const reclamos = await this.reclamosService.buscarTodos(pLimit, pOffset);
            res.status(200).send(
                { estado: 'OK', data: reclamos }
            );
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno"
            });
        }
    }
}