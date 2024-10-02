import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function soloCliente(req, res, next) {
    const logueado = revisarCookie(req)

    if (logueado) return next();
    return res.redirect('/')
}

function soloPublico(req, res, next) {
    const logueado = revisarCookie(req)
    console.log(logueado.descripcion)
    if (!logueado) return next();
    else if (logueado.descripcion === "Cliente") {
        console.log('Funciono')
        return res.redirect('/api/cliente')
    }
    else if (logueado.descripcion === "Empleado") {
        console.log('Funciono')
        return res.redirect('/api/empleado')
    }
    else if (logueado.descripcion === "Administrador") {
        console.log('Funciono')
        return res.redirect('/api/administrador')
    } 
    
}

function revisarCookie(req){
    try {
        // console.log(req.headers.cookie)
        const cookieJWT =  req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)
        // console.log(cookieJWT)
        const decodificado = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        console.log(decodificado)
        return {idUsuario: decodificado.idUsuario, descripcion: decodificado.descripcion}
    } catch {
        return false
    }
}

export const method = {
    soloCliente, 
    soloPublico,
    revisarCookie
}