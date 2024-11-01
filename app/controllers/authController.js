import AuthService from "../services/authService.js"

export default class AuthController {
    constructor(){
        this.service = new AuthService()
    }

    iniciarSesion = async (req, res) => {
        try {
            const { correoElectronico, contrasenia } = req.body
        
            const resultado = await this.service.iniciarSesion(correoElectronico, contrasenia)
            return res.status(200).json(resultado)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    registrar = async () => {
        
    }
}

