const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { userModel } = require('../models/user')


const router = Router()

const conector = new ContenedorMongoDb() 

router.get('/home/:email', async (req,res) => {


    try {
      let documento = await userModel.find({"email" : req.params.email})
      // console.log(documento)
    
      res.json(documento)
      // return JSON.parse(productos)
  } catch (error) {
     console.log(error)
     logger.error('error al iniciar sesion')
  }
      
  })





router.post('/finalizar', async (req,res) => {

  const productos = req.body.carrito.map(({nombre,precio}) => {
    return {nombre, precio}
  } )

console.log(productos)
            let transporter = nodemailer.createTransport({
              service:"gmail",
              auth:{
              user:"alvaro.leiva@websal.com",
              pass:"alvaroagustin1997"
              },
              tls:{
              rejectUnauthorized: false
              }
          })

          let mailOptions = {
            from:"Ecommerce <alvaro.leiva@websal.com>",
            to:'alvaro.leiva@websal.com',
            subject:`Nuevo pedido de ${req.body.nombre} `,
            text:`el usuario de email: ${req.body.email}
              a comprado los siguientes productos ${JSON.stringify(productos)}
              
            `,
            
          }


          transporter.sendMail(mailOptions, function (err, success) {
            if(err){
            console.log(err)
            

            } else {
            console.log('Email good sent')
            res.json('enviado')
            }

          } )

          const accountSid = 'AC979e1c0006537ff58a80ad5713046c50'
          const authToken = 'c830bf15df3f90b3943ae27ff588b8b3'

          const client = twilio(accountSid,authToken)

          try {
            const message = await client.messages.create({
              body:'Tu pedido a sido recibido y se encuentra en proceso',
              from:'+19894479605',
              to:`+${req.body.telefono}`
            })

            // console.log(message)
            
          } catch (error) {
            console.log(error)
            logger.error('error al iniciar sesion')
          }
          try {
            const message = await client.messages.create({
              body:`el usuario de email: ${req.body.email}
              a comprado los siguientes productos ${JSON.stringify(productos[0])}
            `,
              from:'whatsapp:+14155238886',
              to:`whatsapp:+56962121886`
            })

            // console.log(message)
            
          } catch (error) {
            console.log(error)
            logger.error('error al iniciar sesion')
          }


          res.json('enviado')
 


})

  


module.exports = router
