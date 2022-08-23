
const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb');
const { userModel } = require('../models/user');
const passport = require('passport')
const bcrypt = require('bcrypt');

require("../passportConfig")(passport);
const router = Router()
const nodemailer = require('nodemailer')



router.post('/login', (req,res, next) => {
    
    passport.authenticate('local', (err,user, info) => {
        if(err) throw err;
        if (!user) res.send('no user exists');
        else{
            req.logIn(user, err => {
                if(err) throw err;
                res.send('ready')
            })
        }

    } )(req,res,next)
} )


router.post('/register',  (req,res) => {
    userModel.findOne({email: req.body.username}, async (err,doc) => {
        if(err) throw err;
        if(doc) res.send('user already exist');
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10)


            const newUser = new userModel({
                email:req.body.username,
                password:hashedPassword,
                nombre:req.body.nombre,
                direccion:req.body.direccion,
                edad:req.body.edad,
                telefono:req.body.telefono
            });
            await newUser.save()
            res.json('ready')


            
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
               email:${req.body.email}  
               nombre:${req.body.nombre}  
               direccion:${req.body.direccion}  
               edad:${req.body.edad}  
               telefono:${req.body.telefono}  
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





        }
    } )
} )



module.exports = router


