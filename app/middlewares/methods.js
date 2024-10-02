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
    if (!logueado) return next();
    
    return res.redirect('/api/cliente')
}

function revisarCookie(req){
    try {
        // console.log(req.headers.cookie)
        const cookieJWT =  req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)
        // console.log(cookieJWT)
        const decodificado = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        return decodificado.idUsuario
    } catch {
        return false
    }
}

export const method = {
    soloCliente, 
    soloPublico,
    revisarCookie
}