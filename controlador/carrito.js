
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { userModel } = require('../models/user')
const { carroUsuario } = require('../negocio/carrito')


async function finalizar(req,res){

      const carrito = req.body.carrito
      const email = req.body.email
      const nombre = req.body.nombre

      const sendCarrito = await carroUsuario(carrito,email,nombre)

     if (sendCarrito === 'listo'){

        res.json('enviado')

     }
    


}



module.exports = {finalizar}