

const {Router}= require('express')
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')

const controlador = require('../controlador/productos.js')
const router = Router()

// const conector = new ContenedorMongoDb() 




router.get('/', controlador.getAll)


router.get('/:id',controlador.getById)

router.post('/', controlador.postProduct )

router.put('/:id', controlador.updateProduct )

router.get('/categoria/:categoria', controlador.getbyCategoria )



router.delete('/:id', controlador.deleteProduct )

module.exports = router