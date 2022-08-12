const express = require('express')
require('dotenv').config()
const fs = require('fs')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const ContenedorMongoDb = require("./contenedores/ContenedorMongoDb");
const ContenedorFirebase = require('./contenedores/ContenedorFirebase');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const session = require('express-session');
const { userModel } = require('./models/user');
const twilio = require('twilio')


const log4js= require("log4js")

const clusterOn = require('cluster');

const multer = require('multer');

const numCPUs = require('os').cpus().length
// const Passport = require('passport-local').Strategy
// const passport = require('passport')


const yargs = require('yargs/yargs')(process.argv.slice(2))

const {puerto,cluster} = yargs.
    alias({
        p:'puerto',
        c:'cluster'
    }).
    default({
        puerto:8081,
        cluster:false
    }).argv


if(cluster && clusterOn.isMaster){
  console.log('cluster')
  console.log(numCPUs)
  console.log(`PID MASTER ${process.pid} `)

     for (let i = 0; i < numCPUs; i++) {
      clusterOn.fork()
      
     }

     clusterOn.on('exit',worker => {
      console.log('worker', worker.process.pid,'died', new Date().toLocaleString())
      clusterOn.fork()
     })
}else {
  console.log('fork')

  const PORT = process.env.PORT  || 8080

  app.get('/fork' , (req,res) => {
      res.send(`servidor express en ${PORT} - PID ${process.pid}  `)
  } )

  app.listen(PORT , err => {
      if(!err) console.log(`servidor express en ${PORT} - PID ${process.pid}  `)
  })


}


log4js.configure({

  appenders:{
   consola:{type:'console'},
   archivoErrores: {type:'file', filename: 'error.log'},
   archivoWarn:{type:'file', filename: 'warn.log'},
   loggerConsola: {type:'logLevelFilter', appender:'consola', level:'info'},
   loggerArchivoErrores:{type:'logLevelFilter', appender:'archivoErrores', level:'error'},
   loggerArchivoWarn:{type:'logLevelFilter', appender:'archivoWarn', level:'warn'},

  },
  categories:{
    default:{
        appenders: ['loggerConsola','loggerArchivoErrores','loggerArchivoWarn'], level:'all'
    }
  }


})

module.exports = logger = log4js.getLogger();






mongoose.connect(
    'mongodb+srv://alvi:12qwaszx@cafecluster.agk3g.mongodb.net/ecommerce?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Mongoose Is Connected");
    }
  );
  
  
  // Middleware
  app.use('/static', express.static('public'))

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3001", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cookieParser("secretcode"));
  app.use(passport.initialize());
  app.use(passport.session());
  require("./passportConfig")(passport);
  

// passport.use(new Passport(function (username,password,done){
//     userModel.findOne({email:username})
    
//     if(username === 'alvi' && password === '1234')
//     return done(null, {id:1, nombre:"alvaro" })
    

//     done(null,false)

// }))


// passport.serializeUser(function(user,done){
//     done(null,user.id)
// })


// passport.deserializeUser(function(id,done){
//     done(null, {id:1, nombre:"alvaro" })
// })



let envVars = process.env.DATABASE


const routerProductos = express.Router()
const routerCarrito = express.Router()
const routerAuth = express.Router()

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/auth', routerAuth)

// routerProductos.use(express.json())
// routerProductos.use(express.urlencoded({extended:true}))
// routerCarrito.use(express.json())
// routerCarrito.use(express.urlencoded({extended:true}))
// routerAuth.use(express.json())
// routerAuth.use(express.urlencoded({extended:true}))


const conector = envVars === 'FIREBASE' ? new ContenedorFirebase() : envVars === 'MONGO' ? new ContenedorMongoDb() : null


// conector.connect()

// routerAuth.post('/login', (req,res)=>{
    
// })

app.get('/', (res,res) => {
  res.send('jola')
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})


const upload = multer({ storage: storage }).single('file')


app.post('/upload',function(req, res) {

  // console.log(req.body.pick)
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});

app.post('/uploadMongo',async(req, res) =>{

  console.log(req.body.pick)

  console.log(req.body.email)
  try {

 const response = await userModel.update({'email':req.body.email}, { $set : {'foto':req.body.pick} })

 console.log(response)
    
  } catch (error) {
    console.log(error)
  }


//  console.log(response)
  
     


});




app.post('/login',cors(), (req,res, next) => {
    
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

app.get('/user', cors(), (req,res) => {
    res.json(req.user)
    console.log(req.user)
})
app.get('/home/:email', cors(),async (req,res) => {


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


app.post('/finalizar', cors(), async (req,res) => {

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
              a comprado los siguientes productos ${productos}
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
          const authToken = '0c5734bde106ad0338261662e55ff5bf'

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

app.post('/register',cors(),  (req,res) => {
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

// ------------------------  PRODUCTOS API -----------------------

routerProductos.get('/',cors(), async (req,res) => {
    

    conector.getAll(res)

  
} )


routerProductos.get('/:id',cors(), async (req,res) => {


  
    conector.getById(req,res)
    


} )




routerProductos.post('/',cors(), async (req,res) => {

  
    conector.postProduct(req,res)
  
        
} )


routerProductos.put('/:id',cors(), async (req,res) => {

  conector.updateProduct(req,res)



} )

routerProductos.delete('/:id',cors(), async (req,res) => {

    
    conector.delete(req,res)
 

} )

// ------------------------  CARRITO API -----------------------


// routerCarrito.get('/', (req,res) => {

//     let carritoRead =  fs.readFileSync('carrito.json')
//     let carrito = JSON.parse(carritoRead)
 
//     console.log(carrito)
 
//      res.json(carrito)
//  } )


//  routerCarrito.post('/', (req,res) => {

//     let carritoRead =  fs.readFileSync('carrito.json')
//     let carrito = JSON.parse(carritoRead)


//      carrito.push({
//        id: carrito.length,
//        timestamp: Date.now(),
//      })
     
        
//     fs.writeFileSync('carrito.json', JSON.stringify(carrito))

//     res.json({id:carrito[carrito.length-1].id})
// } )


// routerCarrito.delete('/:id', (req,res) => {
//     const id = parseInt(req.params.id)

//     let carritoRead =  fs.readFileSync('carrito.json')
//     let carrito = JSON.parse(carritoRead)

//     let found = carrito.find(item => item.id === id)

//    if(!found){

          
//           return res.json('No existe carrito con ese id')
//    }

//     carrito = carrito.filter(item => item.id !== id )
     
//     fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
    

//     res.json( carrito)
// } )

// routerCarrito.get('/:id/productos', (req,res) => {
//     const id = parseInt(req.params.id)

//     let carritoRead =  fs.readFileSync('carrito.json')
//     let carrito = JSON.parse(carritoRead)

//     let found = carrito.find(item => item.id === id)

//    if(!found){

          
//           return res.json('No existe carrito con ese id')
//    }

//     // carrito = carrito.filter(item => item.id === id )
    
//     if(!found.producto){
//         found.producto=[]
//     }

//     console.log(found)
//     res.json(found)
     
//     // fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 

// } )


// routerCarrito.post('/:id/productos', (req,res) => {
//     const id = parseInt(req.params.id)

//     let carritoRead =  fs.readFileSync('carrito.json')
//     let carrito = JSON.parse(carritoRead)

//     let found = carrito.find(item => item.id === id)
//     carrito = carrito.filter(item => item.id !== id )

//    if(!found){

          
//           return res.json('No existe carrito con ese id')
//    }

//    if(!found.producto){


//     found.productos=[]
//     found.productos = [...found.productos,req.body]
//     found.productos[found.productos.length-1].id = found.productos.length

//        carrito.push(found)

//         fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
//         console.log(carrito)

//        res.json( carrito)
    
//     }else {

        
//       found.productos = [...found.productos,req.body]
//       found.productos[found.productos.length-1].id = found.productos.length
//       carrito.push(found)

//         fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
//         console.log('escrotp',carrito)

//         res.json( carrito)

//     }



//     //   carrito.push(found)

    
    
//     //     // carrito.producto=req.body
    

//     console.log(carrito)
     

// } )

// routerCarrito.delete('/:id/:id_prod', (req,res) => {
//     const id = parseInt(req.params.id)
//     const id_prod = parseInt(req.params.id_prod)

//     let carritoRead =  fs.readFileSync('carrito.json')
//     let carrito = JSON.parse(carritoRead)

//     let foundCarrito = carrito.find(item => item.id === id)
//     carrito = carrito.filter(item => item.id !== id)
 
//    if(!foundCarrito){

          
//           return res.json('No existe carrito con ese id')
//    }


     
//    let filterProductoCarrito = foundCarrito.productos.filter(item => item.id !== id_prod)

//    foundCarrito.productos = filterProductoCarrito
  
//    carrito.push(foundCarrito)

//     fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
    
//   console.log(foundCarrito)
//     res.json( carrito)
// } )


// const server = app.listen(process.env.PORT, () => {
//     console.log(`servidor escuchando en el puerto ${process.env.PORT}`)
// } )


// server.on('error', error => console.log(`${error}`) )