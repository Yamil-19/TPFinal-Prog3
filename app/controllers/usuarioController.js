import UsuarioServices from "../services/usuarioServices.js";
import jsonWebToken from 'jsonwebtoken'
import dotenv from 'dotenv'
import { method as authorization } from "../middlewares/methods.js";

dotenv.config()

export default class UsuarioController {
    constructor() {
        this.service = new UsuarioServices()
    }

    register = async (req, res) => {
        const { body } = req;

        if (!body.nombre || !body.apellido || !body.correoElectronico || !body.contrasenia || !body.descripcion) {
            res.status(404).send({
                    status: "Fallo",
                    data: {
                        error: "Uno de los datos falta o es vacío."
                    }
                });
        }

        const usuario = {
            nombre: body.nombre,
            apellido: body.apellido,
            correoElectronico: body.correoElectronico,
            descripcion: body.descripcion,
            contrasenia: body.contrasenia,
            imagen: body.imagen,
            activo: body.activo
        };

        try {
            const usuarioCreado = await this.service.register(usuario);
            res.status(201).send({ status: "OK", data: usuarioCreado, redirect:'/api' });
        } catch (error) {
            res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

    iniciarSesion = async (req, res) => {
        const { body } = req;

        if (!body.nombre || !body.contrasenia) {
            res.status(404).send({
                    status: "Fallo",
                    data: {
                        error: "Uno de los datos falta o es vacío."
                    }
                });
        }

        const usuario = {
            nombre: body.nombre,
            contrasenia: body.contrasenia,
        };

        try {
            const usuarioLogin = await this.service.iniciarSesion(usuario);
            const idUsuario = await this.service.obtenerId(usuario)
            const token = jsonWebToken.sign({idUsuario: idUsuario, nombre: usuario.nombre}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION})
            const cookieOption = {
                path: '/'
            }
            res.cookie('jwt', token, cookieOption)
            res.status(201).send({ status: "OK", data: usuarioLogin, redirect: usuarioLogin});
        } catch (error) {
            res
            .status(error?.status || 500)
            .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }
    
    crearReclamo = async (req, res) => {
        // console.log(req.headers.cookie)
        const { body } = req;
        
        if (!body.asunto) {
            res.status(404).send({
                status: "Fallo",
                data: {
                    error: "falta datos o es vacío."
                }
            });
        }
        
        const idUsuarioCreador = authorization.revisarCookie(req);
        
        if (!idUsuarioCreador) {
            return res.send({
                status: "Fallo",
                data: { error: "Usuario no autenticado." }
            });
        }

        const reclamo = {
            asunto: body.asunto,
            descripcion: body.descripcion,
            activo: body.activo,
            idUsuarioCreador: idUsuarioCreador
        };
        try {
            const reclamoCliente = await this.service.crearReclamo(reclamo);

            res.status(201).send({ status: "OK", data: reclamoCliente});
        } catch (error) {
            res
            .status(error?.status || 500)
            .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }
    
    obtenerReclamo = async (req, res) => {
        const idUsuarioCreador = authorization.revisarCookie(req);
        try {
            const reclamoObtenido = await this.service.obtenerReclamo(idUsuarioCreador)
            // console.log(reclamoObtenido)
            res.status(200).send(reclamoObtenido);
        } catch (error){
            res
            .status(error?.status || 500)
            .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

}

