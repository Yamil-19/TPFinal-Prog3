import UsuarioServices from "../services/usuarioServices.js"; //importa el servicio que contiene la lógica de negocio relacionada con los usuarios
import jsonWebToken from 'jsonwebtoken'; // importa el módulo que te permite crear y verificar json web tokens (jwt)
import dotenv from 'dotenv'; // permite cargar las variables de entorno desde el archivo . env (como la clave secreta del JWT)
import { method as authorization } from "../middlewares/methods.js"; // importa las funciones de autorización desde el archivo de middleware que se encargan de verificar si el usuario está autenticado y autorizado

dotenv.config()

export default class UsuarioController {
    constructor() {
        this.service = new UsuarioServices()
    } // inicializa la clase UsuarioController creando una instancia de UsuarioServices que contiene la lógica de interacción con la abse de datos

    register = async (req, res) => { // este método se llama cuando un cliente envía una solicitud POST (en el archivo routes)
        const { body } = req; // guarda en body los datos del cuerpo de la solicitud

        if (!body.nombre || !body.apellido || !body.correoElectronico || !body.contrasenia || !body.descripcion) {
            res.status(404).send({
                    status: "Fallo",
                    data: {
                        error: "Uno de los datos falta o es vacío."
                    }
                });
        }
        // verifica si los campos obligatorios están presentes, si falta alguno responde con un error 404

        const usuario = {
            nombre: body.nombre,
            apellido: body.apellido,
            correoElectronico: body.correoElectronico,
            descripcion: body.descripcion,
            contrasenia: body.contrasenia,
            imagen: body.imagen,
            activo: body.activo
        };

        // crea un objeto usuario con la informacion proveniente del cuerpo de la solicitud

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
            contrasenia: body.contrasenia
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

    cancelarReclamo = async (req, res) => {
        const idReclamoEstado = req.params.idReclamoEstado
        console.log('Hasta aca llego:', idReclamoEstado)
        if (!idReclamoEstado) {
            res.status(404).send({ status: "Fallo", data: { error: "El parámetro idReclamoEstado no puede ser vacío." } })
        }
        try {
            const reclamoCancelado = await this.service.cancelarReclamo(idReclamoEstado)
            // console.log(reclamoObtenido)
            res.status(200).send(reclamoCancelado);
        } catch (error){
            res
            .status(error?.status || 500)
            .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

}

