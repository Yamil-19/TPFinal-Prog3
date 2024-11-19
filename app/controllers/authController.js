import AuthService from "../services/authService.js"

export default class AuthController {
    constructor(){
        this.service = new AuthService()
    }

    iniciarSesion = async (req, res) => {
        try {
            const { correoElectronico, contrasenia } = req.body
        
            const resultado = await this.service.iniciarSesion(correoElectronico, contrasenia)
            const cookieOption = {
                path: '/'
            }
            res.cookie('jwt', resultado, cookieOption)
            return res.status(200).json(resultado)
            // res.status(201).json({ status: "OK", data: resultado, redirect: '/cliente'});
        } catch (error) {
            return res.status(error.estado || 500).json({ 
                estado: error.estado || 500, 
                data: { error: error.mensaje } 
            });
        }
    }
}

