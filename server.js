const express = require('express')
require('dotenv').config()
const fs = require('fs')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const ContenedorMongoDb = require("./contenedores/ContenedorMongoDb");
const ContenedorFirebase = require('./contenedores/ContenedorFirebase');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const session = require('express-session');
const { userModel } = require('./models/user');
const twilio = require('twilio')
const routerProductos = require('./rutas/productos.js')
const routerFotos = require('./rutas/fotos.js')
const routerAuth = require('./rutas/login.js')
const routerCarrito = require('./rutas/carrito.js')
const routerMensajes = require('./rutas/mensajes.js')
const routerOrdenes = require('./rutas/ordenes.js')


const http = require("http");
const {Server} = require("socket.io")

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
      origin:"http://localhost:3000",
      methods:["GET", "POST"]
    },
})

// const server = require('http').Server(app)
// const io = require('socket.io')(server)

// const socketio = require('socket.io')
// const io = socketio(app)


const log4js= require("log4js")

const clusterOn = require('cluster');

const multer = require('multer');

const numCPUs = require('os').cpus().length
// const Passport = require('passport-local').Strategy
// const passport = require('passport')


const yargs = require('yargs/yargs')(process.argv.slice(2))

console.log(yargs.argv.dev)


const {puerto,cluster} = yargs.
    alias({
        p:'puerto',
        c:'cluster'
    }).
    default({
        puerto:8083,
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

   if(yargs.argv.dev){

       const PORT = yargs.argv.puerto || process.env.PORT  || 8080  

          app.get('/fork' , (req,res) => {
            res.send(`servidor express en ${PORT} - PID ${process.pid}  `)
        } )

        server.listen(PORT , err => {
            if(!err) console.log(`servidor express en ${PORT} - PID ${process.pid}  `)
        })

         
   }else {

    const PORT =  process.env.PORT  || 8080 // PRODUCCION

    app.get('/fork' , (req,res) => {
        res.send(`servidor express en ${PORT} - PID ${process.pid}  `)
    } )
  
    server.listen(PORT , err => {
        if(!err) console.log(`servidor express en ${PORT} - PID ${process.pid}  `)
    })


   }   



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
  app.use(cors());
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
  




// const routerProductos = express.Router()
// const routerCarrito = express.Router()
// const routerAuth = express.Router()

app.use('/api/productos', routerProductos)
app.use('/api/fotos', routerFotos)
app.use('/api/carrito', routerCarrito)
app.use('/api/auth', routerAuth)
app.use('/api/mensajes', routerMensajes)
app.use('/api/ordenes', routerOrdenes)



io.on('connection', socket => {

    socket.on("send_message", (data) =>{
        console.log(data)
        socket.broadcast.emit("receive_message",data )
    } )

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



