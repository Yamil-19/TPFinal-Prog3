import express from 'express'; // es un framework de node.js para manejar el enrutamiento de la API

import { login, register, cliente, administrador, empleado } from '../urlPages/url.js'; 
// importa los objetos login, register, cliente, administrador y empleado desde un archivo que se encuentra en
// la carpeta urlPages. Estos objetos contienen HTML que se devolverán cuando el usuario acceda a las rutas correspondientes

import UsuarioController from '../../controllers/usuarioController.js' //importa el controlador UsuarioController que contiene la lógica de las operaciones relacionadas con los usuarios
import { method as authorization } from '../../middlewares/methods.js' //importa los métodos de autorizacion que se usan para controlar el acceso a las rutas, como verificar si un usuario es cliente, adm o público


const usuarioController = new UsuarioController() 
// crea una nueva instancia del controlador UsuarioController. Esto permite invocar sus métodos en las rutas de la API para manejar las solicitudes

const router = express.Router() // crea uj nuevo enrutador de express. el enrutador se utiliza para definir las rutas de la API agrupándolas en un solo lugar

router.get('/', authorization.soloPublico ,(req, res) => {
    res.status(200).send(login)
})
// asegura que solo los usuarios no autenticados (públicos) puedan acceder. responde con el objeto login (html de login)

router.get('/register', authorization.soloPublico, (req, res) => {
    res.status(200).send(register)
})
// asegura que solo usuarios públicos (no autenticados) puedan acceder. Responde con el objeto register (html)

router.get('/cliente',authorization.soloCliente, (req, res) => {
    res.status(200).send(cliente)
}); // asegura que solo los usuarios con el rol de cliente puedan acceder. responde con el objeto cliente (html)



router.get('/empleado', (req, res) => {
    res.status(200).send(empleado)
})
router.get('/administrador', (req, res) => {
    res.status(200).send(administrador)
})

router.get('/cliente/reclamo',authorization.soloCliente, usuarioController.obtenerReclamo)


router.patch('/cliente/reclamo/:idReclamoEstado',authorization.soloCliente, usuarioController.cancelarReclamo)

router.post('/register', usuarioController.register)
router.post('/login', usuarioController.iniciarSesion)
router.post('/cliente/reclamo', usuarioController.crearReclamo)

export { router }
