const express = require('express')
require('dotenv').config()
const fs = require('fs')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const { productoModel } = require('./models/productos');

const ContenedorMongoDb = require("./contenedores/ContenedorMongoDb");
const ContenedorFirebase = require('./contenedores/ContenedorFirebase');
require('dotenv').config()

let envVars = process.env.DATABASE



const routerProductos = express.Router()
const routerCarrito = express.Router()

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended:true}))
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({extended:true}))


const conector = envVars === 'FIREBASE' ? new ContenedorFirebase() : envVars === 'MONGO' ? new ContenedorMongoDb() : null


conector.connect()


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


const server = app.listen(process.env.PORT, () => {
    console.log(`servidor escuchando en el puerto ${process.env.PORT}`)
} )


server.on('error', error => console.log(`${error}`) )