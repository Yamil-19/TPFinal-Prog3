import ClientesService from "../services/clientesService.js";
import jsonWebToken from 'jsonwebtoken'
import dotenv from 'dotenv'
import { method as authorization } from "../middlewares/methods.js";

dotenv.config()

export default class ClientesController {
    constructor() {
        this.service = new ClientesService()
    }

    obtenerReclamo = async (req, res) => {
        const usuario = authorization.revisarCookie(req);
        const idUsuarioCreador = usuario.idUsuario
        try {
            const reclamoObtenido = await this.service.obtenerReclamo(idUsuarioCreador)
            // console.log(reclamoObtenido)
            return res.status(200).send(reclamoObtenido);
        } catch (error) {
            return res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

    actualizarPerfil = async (req, res) => {
        const {body} = req
        const perfilUsuario = authorization.revisarCookie(req);

        const usuario = {}
        if (body.nombre !== '') {
            usuario.nombre = body.nombre
        }
        if (body.apellido !== '') {
            usuario.apellido = body.apellido
        }
        if (body.correoElectronico !== '') {
            usuario.correoElectronico = body.correoElectronico
        }
        if (body.contraseña !== '') {
            usuario.contrasenia = body.contraseña
        }

        try {
            const usuarioActualizado = await this.service.actualizarPerfil(usuario, perfilUsuario.idUsuario);
            return res.status(201).send({ status: "OK", data: usuarioActualizado});
        } catch (error) {
            return res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }
}