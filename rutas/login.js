
const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb');
const { userModel } = require('../models/user');
const passport = require('passport')
const bcrypt = require('bcrypt');

require("../passportConfig")(passport);
const router = Router()
const nodemailer = require('nodemailer')

const controlador = require('../controlador/login.js')



router.post('/login', controlador.login)


router.post('/register',  controlador.register)

router.get('/home/:email', controlador.getData)



module.exports = router


