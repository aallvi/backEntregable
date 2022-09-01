

const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')

const controlador = require('../controlador/ordenes.js')
const router = Router()


router.get('/:email', controlador.getByEmail)





module.exports = router