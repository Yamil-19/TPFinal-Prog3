import Reclamos from "../capaDatos/reclamos.js";

export default class ReclamosService {

    constructor (){
        this.reclamos = new Reclamos();
    }

    buscarTodos = (limit, offset) => {
        return this.reclamos.buscarTodos(limit, offset);
    }
}