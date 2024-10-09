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
            return res.status(404).send({
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
            return res.status(201).send({ status: "OK", data: usuarioCreado, redirect:'/api' });
        } catch (error) {
            return res
                    .status(error?.status || 500)
                    .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

    iniciarSesion = async (req, res) => {
        const { body } = req;

        if (!body.nombre || !body.contrasenia) {
            return res.status(404).send({
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
            const datos = await this.service.obtenerDatos(usuario)
            const token = jsonWebToken.sign({idUsuario: datos.idUsuario, nombre: usuario.nombre, descripcion: datos.descripcion}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION})
            const cookieOption = {
                path: '/',
            }
            res.cookie('jwt', token, cookieOption)
            res.status(201).send({ status: "OK", data: usuarioLogin, redirect: usuarioLogin});
        } catch (error) {
            return res
                    .status(error?.status || 500)
                    .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }
    
    crearReclamo = async (req, res) => {
    
        const { body } = req;
        
        if (!body.asunto) {
            return res.status(404).send({
                    status: "Fallo",
                    data: {
                        error: "falta dato o es vacío."
                    }
            });
        }
        
        const idUsuarioCreador = authorization.revisarCookie(req);
        
        if (!idUsuarioCreador) {
            return res.send({
                    status: "Fallo",
                    data: { 
                        error: "Usuario no autenticado." 
                    }
            });
        }

        const reclamo = {
            idTipo: body.idTipo,
            tipo: body.tipo,
            asunto: body.asunto,
            descripcion: body.descripcion,
            activo: body.activo,
            idUsuarioCreador: idUsuarioCreador.idUsuario
        };
        try {
            const reclamoCliente = await this.service.crearReclamo(reclamo);

            return res.status(201).send({ status: "OK", data: reclamoCliente});
        } catch (error) {
            return res
                    .status(error?.status || 500)
                    .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }
    
    obtenerReclamo = async (req, res) => {
        const usuario = authorization.revisarCookie(req);
        console.log(usuario)
        const idUsuarioCreador = usuario.idUsuario
        try {
            const reclamoObtenido = await this.service.obtenerReclamo(idUsuarioCreador)
            return res.status(200).send(reclamoObtenido);
        } catch (error){
            return res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

    obtenerReclamosTipo = async (req, res) => {
        try {
            const reclamosTipoObtenidos = await this.service.obtenerReclamosTipo()
            return res.status(200).send(reclamosTipoObtenidos);
        } catch (error){
            return res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

    agregarReclamoTipo = async (req, res) => { // <-----
        const idReclamoTipo = req.params.idReclamoTipo

        if (!idReclamoTipo) {
            return res.status(404).send({ status: "Fallo", data: { error: "El parámetro idReclamoTipo no puede ser vacío." } })
        }
        //
        // <------
        //
    }

    modificarReclamoTipo = async (req, res) => {
        const idReclamoTipo = req.params.idReclamoTipo
        const body = req.body
        console.log(body)

        if (!idReclamoTipo) {
            return res.status(404).send({ status: "Fallo", data: { error: "El parámetro idReclamoTipo no puede ser vacío." } })
        }
        try {
            const reclamoTipoModificado = await this.service.modificarReclamoTipo(idReclamoTipo, body.descripcion, body.activo)
            return res.status(200).send(reclamoTipoModificado)
            console.log("ahre")
        } catch {
            console.log("ahre2")
        }
    }
    // activarReclamoTipo = () => {

    // }
    // desactivarReclamoTipo = () => {

    // }



    cancelarReclamo = async (req, res) => {
        const idReclamoEstado = req.params.idReclamoEstado

        if (!idReclamoEstado) {
            return res.status(404).send({ status: "Fallo", data: { error: "El parámetro idReclamoEstado no puede ser vacío." } })
        }
        try {
            const reclamoCancelado = await this.service.cancelarReclamo(idReclamoEstado)
            return res.status(200).send(reclamoCancelado);
        } catch (error){
            return res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

    actualizarPerfil = async (req, res) => {
        const {body} = req
        const perfilUsuario = authorization.revisarCookie(req);

        if (!body.nombre || !body.apellido || !body.correoElectronico || !body.contraseña) {
            return res.status(404).send({
                    status: "Fallo",
                    data: { error: "Uno de los datos falta o es vacío." }
                });
        }  

        const usuario = {
            nombre: body.nombre,
            apellido: body.apellido,
            correoElectronico: body.correoElectronico,
            contraseña: body.contraseña,
            idUsuario: perfilUsuario.idUsuario
        };

        try {
            const usuarioActualizado = await this.service.actualizarPerfil(usuario);
            return res.status(201).send({ status: "OK", data: usuarioActualizado});
        } catch (error) {
            return res
                .status(error?.status || 500)
                .send({ status: "Fallo", data: { error: error?.message || error } });
        }
    }

}

