import Joi from "joi"
import ApiError from "./manejoDeErrores.js"

// Esquemas de validacion
const esquemas = {
    // Esquema de ID
    id: Joi.number().integer().positive().required(),

    // Esquema de descripcion
    descripcion: Joi.string().required(),

    // Esquemas de usuario
    usuarioRequerido: Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        correoElectronico: Joi.string().email().required(),
        contrasenia: Joi.string().required()
    }),
    usuarioOpcional: Joi.object({
        nombre: Joi.string(),
        apellido: Joi.string(),
        correoElectronico: Joi.string().email(),
        contrasenia: Joi.string()
    }),

    // Esquemas de oficina
    oficinaRequerida: Joi.object({
        nombre: Joi.string().required(),
        idReclamoTipo: Joi.number().integer().positive().required()
    }),
    oficinaOpcional: Joi.object({
        nombre: Joi.string(),
        idReclamoTipo: Joi.number().integer().positive()
    }),

    // Esquema de reclamo
    reclamoRequerido: Joi.object({
        asunto: Joi.string().required(),
        descripcion: Joi.string().allow(''),
        idReclamoTipo: Joi.number().integer().positive().required(),
        idUsuarioCreador: Joi.number().integer().positive().required()
    }),
    reclamoOpcional: Joi.object({
        asunto: Joi.string(),
        descripcion: Joi.string(),
        idReclamoTipo: Joi.number().integer().positive(),
        idReclamoEstado: Joi.number().integer().positive(),
        idUsuarioFinalizador: Joi.number().integer().positive()
    })
}


// Funcion general para la validacion
export function validar(datos, tipo) {
    const esquema = esquemas[tipo];
    if (!esquema) {
        throw new ApiError('Esquema de validación no encontrado', 500);
    }

    const { error } = esquema.validate(datos);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}