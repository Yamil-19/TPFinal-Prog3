import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function verificarUsuario(req, res, next) {
    const ruta = req.originalUrl.split('/') 
    const logueado = revisarCookie(req)
    if (!logueado) {
        return res.redirect('/')
    } else if (ruta[2] === "cliente" && logueado.descripcion === "Cliente") {
        return next();
    } else if (ruta[2] === "empleado" && logueado.descripcion === "Empleado") {
        return next();
    } else if (ruta[2] === "administrador" && logueado.descripcion === "Administrador") {
        return next();
    } else {
        res.send({error: "No tenes acceso"})
    }
}

function estaLogueado(req, res, next) {
    const logueado = revisarCookie(req)
    if (!logueado) {
        return next();
    // } else if (logueado.descripcion === "Cliente") {
    //     return res.redirect(`/cliente`)
    } else {
        return res.redirect(`/${logueado.descripcion.toLowerCase()}`);
    } 
}

function revisarCookie(req, res){
    try {
        // console.log(req.headers.cookie)
        const cookieJWT =  req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)
        // console.log(cookieJWT)
        const decodificado = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        // console.log(decodificado)
        return { 
            idUsuario: decodificado.idUsuario, 
            descripcion: decodificado.descripcion, 
            correoElectronico: decodificado.correoElectronico, 
            nombre: decodificado.nombre 
        }
    } catch {
        return false
    }
}

export const method = {
    verificarUsuario, 
    estaLogueado,
    revisarCookie
}