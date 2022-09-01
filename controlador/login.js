

const passport = require('passport')
const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb');
const { userModel } = require('../models/user');
// const passport = require('passport')
const bcrypt = require('bcrypt');

require("../passportConfig")(passport);
const router = Router()
const nodemailer = require('nodemailer');
const { registerNeg, getDatos } = require('../negocio/login');


async function login(req,res, next){

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




}


async function register (req,res){

               const email=req.body.username
               const password=req.body.password
               const nombre=req.body.nombre
               const direccion=req.body.direccion
              const  edad=req.body.edad
              const  telefono=req.body.telefono

              const response = await registerNeg(email,password,nombre,direccion,edad,telefono)

              console.log(response)

              res.json(response)

    
} 


async function getData(req,res){

    const email=req.params.email

    const response = await getDatos(email)

    console.log('email',email)
    console.log('response',response)

    res.json(response)


    // try {
    //     let documento = await userModel.find({"email" : email})
    //     // console.log(documento)
      
    //     res.json(documento)
    //     // return JSON.parse(productos)
    // } catch (error) {
    //    console.log(error)
    //    logger.error('error al iniciar sesion')
    // }


}


module.exports = {login,register,getData}