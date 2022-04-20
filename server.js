const express = require('express')
const fs = require('fs')
const random = require('random')
const app = express()

const routerProductos = express.Router()
const routerCarrito = express.Router()

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended:true}))
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

// ------------------------  CARRITO API -----------------------


routerCarrito.get('/', (req,res) => {

    let carritoRead =  fs.readFileSync('carrito.json')
    let carrito = JSON.parse(carritoRead)
 
    console.log(carrito)
 
     res.json(carrito)
 } )


 routerCarrito.post('/', (req,res) => {

    let carritoRead =  fs.readFileSync('carrito.json')
    let carrito = JSON.parse(carritoRead)


     carrito.push({
       id: carrito.length,
       timestamp: Date.now(),
     })
     

    

    // carrito.push(req.body)

    

    // carrito.productos.push(req.body)
    // carrito[carrito.length-1].id = carrito.length
    // carrito[carrito.length-1].productos.timestamp = Date.now()
    // carrito[carrito.length-1].timestamp = Date.now()
    // carrito[carrito.length-1].productos.id = carrito.productos.length


        
    fs.writeFileSync('carrito.json', JSON.stringify(carrito))

    res.json({id:carrito[carrito.length-1].id})
} )


routerCarrito.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id)

    let carritoRead =  fs.readFileSync('carrito.json')
    let carrito = JSON.parse(carritoRead)

    let found = carrito.find(item => item.id === id)

   if(!found){

          
          return res.json('No existe carrito con ese id')
   }

    carrito = carrito.filter(item => item.id !== id )
     
    fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
    

    res.json( carrito)
} )

routerCarrito.get('/:id/productos', (req,res) => {
    const id = parseInt(req.params.id)

    let carritoRead =  fs.readFileSync('carrito.json')
    let carrito = JSON.parse(carritoRead)

    let found = carrito.find(item => item.id === id)

   if(!found){

          
          return res.json('No existe carrito con ese id')
   }

    // carrito = carrito.filter(item => item.id === id )
    
    if(!found.producto){
        found.producto=[]
    }

    console.log(found)
    res.json(found)
     
    // fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 

} )


routerCarrito.post('/:id/productos', (req,res) => {
    const id = parseInt(req.params.id)

    let carritoRead =  fs.readFileSync('carrito.json')
    let carrito = JSON.parse(carritoRead)

    let found = carrito.find(item => item.id === id)
    carrito = carrito.filter(item => item.id !== id )

   if(!found){

          
          return res.json('No existe carrito con ese id')
   }

   if(!found.producto){


    found.productos=[]
    found.productos = [...found.productos,req.body]
    found.productos[found.productos.length-1].id = found.productos.length

       carrito.push(found)

        fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
        console.log(carrito)

       res.json( carrito)
    
    }else {

        
      found.productos = [...found.productos,req.body]
      found.productos[found.productos.length-1].id = found.productos.length
      carrito.push(found)

        fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
        console.log('escrotp',carrito)

        res.json( carrito)

    }



    //   carrito.push(found)

    
    
    //     // carrito.producto=req.body
    

    console.log(carrito)
     

} )

routerCarrito.delete('/:id/:id_prod', (req,res) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)

    let carritoRead =  fs.readFileSync('carrito.json')
    let carrito = JSON.parse(carritoRead)

    let foundCarrito = carrito.find(item => item.id === id)
    carrito = carrito.filter(item => item.id !== id)
 
   if(!foundCarrito){

          
          return res.json('No existe carrito con ese id')
   }


     
   let filterProductoCarrito = foundCarrito.productos.filter(item => item.id !== id_prod)

   foundCarrito.productos = filterProductoCarrito
  
   carrito.push(foundCarrito)

    fs.writeFileSync('carrito.json', JSON.stringify(carrito)) 
    
  console.log(foundCarrito)
    res.json( carrito)
} )









// ------------------------  PRODUCTOS API -----------------------

routerProductos.get('/', (req,res) => {

   let productosRead =  fs.readFileSync('productos.json')
   let productos = JSON.parse(productosRead)

   console.log(productos)

    res.json(productos)
} )


routerProductos.post('/', (req,res) => {

    let productosRead =  fs.readFileSync('productos.json')
    let productos = JSON.parse(productosRead)

    productos.push(req.body)
    productos[productos.length-1].id = productos.length

    fs.writeFileSync('productos.json', JSON.stringify(productos))

    res.json(productos)
} )


routerProductos.put('/:id', (req,res) => {


    let productosRead =  fs.readFileSync('productos.json')
    let productos = JSON.parse(productosRead)
   
    const id = parseInt(req.params.id)
    
   let found = productos.find(item => item.id === id)

   if(!found){

          
          return res.json('No existe producto con ese id')
   }


    productos.map( (item) => {

        if(item.id === id){


            item.title = req.body.title;
            item.precio =  req.body.precio
            item.thumbnail = req.body.thumbnail
  
            fs.writeFileSync('productos.json', JSON.stringify(productos)) 
            res.json( productos)

        } 
        
       
      });



} )

routerProductos.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id)

    let productosRead =  fs.readFileSync('productos.json')
    let productos = JSON.parse(productosRead)

    let found = productos.find(item => item.id === id)

   if(!found){

          
          return res.json('No existe producto con ese id')
   }
    //  const productosFiltrados = productos.filter(item => item.id !== id )

    productos = productos.filter(item => item.id !== id )
     
    fs.writeFileSync('productos.json', JSON.stringify(productos)) 
    

    res.json( productos)
} )






const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${server.address().port}`)
} )


server.on('error', error => console.log(`${error}`) )