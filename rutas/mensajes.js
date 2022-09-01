

const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')

const controlador = require('../controlador/mensajes.js')
const router = Router()


router.post('/', controlador.setMensaje )

router.get('/:email', controlador.getMensajes )




module.exports = router
