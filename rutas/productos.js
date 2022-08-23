

const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')

const controlador = require('../controlador/productos.js')
const router = Router()

const conector = new ContenedorMongoDb() 



// router.get('/', async (req,res) => {
    

//     conector.getAll(res)

  
// } )

router.get('/', controlador.getAll)


router.get('/:id', async (req,res) => {


  
    conector.getById(req,res)
    


} )

// router.get('/:id', controlador.getById )




// router.post('/', async (req,res) => {

  
//     conector.postProduct(req,res)
  
        
// } )

router.post('/', controlador.postProduct )




// router.put('/:id', async (req,res) => {

//   conector.updateProduct(req,res)



// } )

router.put('/:id', controlador.updateProduct )





router.delete('/:id', controlador.deleteProduct )

module.exports = router