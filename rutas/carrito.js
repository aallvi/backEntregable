const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { userModel } = require('../models/user')

const controlador = require('../controlador/carrito.js')

const router = Router()

const conector = new ContenedorMongoDb() 






router.post('/finalizar', controlador.finalizar)

  


module.exports = router
