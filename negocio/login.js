
const bcrypt = require('bcrypt');
const { userModel } = require('../models/user');
const nodemailer = require('nodemailer');
const loginDaoDb = require('../persistencia/login');
const LoginDao = require('../daos/LoginDao');


const loginDao = new LoginDao()

async function getDatos(email){
    const response = await loginDao.getData(email)

    return response
}

async function registerNeg(email,password,nombre,direccion,edad,telefono){

    
    let usuario = await loginDao.findMail(email)

    console.log('usuario',usuario)

    if(usuario) return 'user already exist';
    if(!usuario){
        const hashedPassword = await bcrypt.hash(password, 10)

           await loginDao.saveUser(email,hashedPassword,nombre,direccion,edad,telefono)


        
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
          to:'aleiva97@gmail.com',
          subject:"Se ha registrado un nuevo usuario",
          text:`Se ha registrado el siguiente usuario
           email:${email}  
           nombre:${nombre}  
           direccion:${direccion}  
           edad:${edad}  
           telefono:${telefono}  
          `,
          
      }


      transporter.sendMail(mailOptions, function (err, success) {
          if(err){
          console.log(err)
          

          } else {
          console.log('Email good sent')
          // res.json('enviado')
          }


  } )

         return 'ready'




    }

    // userModel.findOne({email}, async (err,doc) => {
    //     if(err) throw err;
    //     if(doc) return 'user already exist';
    //     if(!doc){
    //         const hashedPassword = await bcrypt.hash(password, 10)


    //         const newUser = new userModel({
    //             email:email,
    //             password:hashedPassword,
    //             nombre:nombre,
    //             direccion:direccion,
    //             edad:edad,
    //             telefono:telefono
    //         });
    //         await newUser.save()
            


            
    //           let transporter = nodemailer.createTransport({
    //             service:"gmail",
    //             auth:{
    //             user:"alvaro.leiva@websal.com",
    //             pass:"alvaroagustin1997"
    //             },
    //             tls:{
    //             rejectUnauthorized: false
    //             }
    //         })

    //         let mailOptions = {
    //           from:"Ecommerce <alvaro.leiva@websal.com>",
    //           to:'aleiva97@gmail.com',
    //           subject:"Se ha registrado un nuevo usuario",
    //           text:`Se ha registrado el siguiente usuario
    //            email:${email}  
    //            nombre:${nombre}  
    //            direccion:${direccion}  
    //            edad:${edad}  
    //            telefono:${telefono}  
    //           `,
              
    //       }


    //       transporter.sendMail(mailOptions, function (err, success) {
    //           if(err){
    //           console.log(err)
              

    //           } else {
    //           console.log('Email good sent')
    //           // res.json('enviado')
    //           }

    //           return 'ready'

    //   } )





    //     }
    // } )

}


module.exports = {registerNeg,getDatos}
