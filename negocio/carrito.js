

const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { userModel } = require('../models/user')
const CarritoDb = require('../persistencia/carrito')


const carritoDb = new CarritoDb()


const yargs = require('yargs/yargs')(process.argv.slice(2))

// console.log('yargs',yargs.argv.email)
// console.log('yargs',yargs.argv.clave)

async function carroUsuario(carrito,email,nombre){
    

    const {precio,telefono} = carrito

    const productos = carrito.map(({nombre,precio}) => {
        return {nombre, precio}
      } )

      const sum = productos.reduce((accumulator, object) => {
        return accumulator + object.precio;
      }, 0);

      console.log(sum)

      console.log('CARRITO',carrito)

      const saveOrden = await carritoDb.ordenes(carrito,email,nombre,sum)

      console.log('ordenSave',saveOrden)


    
    // console.log(productos)


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
                to:yargs.argv.email ? yargs.argv.email : 'aleiva97@gmail.com',
                subject:`Nuevo pedido de ${nombre} `,
                text:`el usuario de email: ${email}
                  a comprado los siguientes productos ${JSON.stringify(productos)}
                  
                `,
                
              }
              let mailCliente = {
                from:"Ecommerce <alvaro.leiva@websal.com>",
                to:email,
                subject:`Compra Exitosa `,
                text:`Haz comprado los siguientes productos
                  ${JSON.stringify(productos)}
                  
                `,
                
              }
    
    
              transporter.sendMail(mailCliente, function (err, success) {
                if(err){
                console.log(err)
                
    
                } else {
                console.log('Email good sent Cliente')
                res.json('enviado')
                }
    
              } )

              transporter.sendMail(mailOptions, function (err, success) {
                if(err){
                console.log(err)
                
    
                } else {
                console.log('Email good sent')
                res.json('enviado')
                }
    
              } )
    
            //   const accountSid = 'AC979e1c0006537ff58a80ad5713046c50'
            //   const authToken = 'c830bf15df3f90b3943ae27ff588b8b3'
    
            //   const client = twilio(accountSid,authToken)
    
            //   try {
            //     const message = await client.messages.create({
            //       body:'Tu pedido a sido recibido y se encuentra en proceso',
            //       from:'+19894479605',
            //       to:`+${telefono}`
            //     })
    
            //     // console.log(message)
                
            //   } catch (error) {
            //     console.log(error)
            //     logger.error('error al iniciar sesion')
            //   }
            //   try {
            //     const message = await client.messages.create({
            //       body:`el usuario de email: ${email}
            //       a comprado los siguientes productos ${JSON.stringify(productos[0])}
            //     `,
            //       from:'whatsapp:+14155238886',
            //       to:`whatsapp:+56962121886`
            //     })
    
            //     // console.log(message)
                
            //   } catch (error) {
            //     console.log(error)
            //     logger.error('error al iniciar sesion')
            //   }
    

          return 'listo'





}



module.exports = {carroUsuario}