const { productoModel } = require("../models/productos")
const log4js= require("log4js")

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


async function getProduct(){

    try {
        let productos = await productoModel.find()
        console.log(productos)
      
        return productos
        // return JSON.parse(productos)
    } catch (error) {
        logger.error(error)
       
    }


}


async function getProductById(id){

    try {
        let productos = await productoModel.find({_id: id})
        // console.log(productos)
        // console.log(req);

        return productos
    } catch (error) {
        res.json(error)
        logger.error(error)

    }
}

async function postProductoDb(producto){

    try {
        
        const productoSaveModel = new productoModel(producto)
        let productoSave = await productoSaveModel.save()
        console.log(productoSave)
        return 'grabado'

        
    } catch (error) {
        console.log(error)
        logger.error(error)

    }
}


async function updateProductoDb(id,nombre,precio,descripcion,foto,stock,codigo){

    try {
       

        let actualizado =  await productoModel.replaceOne({"_id" : id}, 
          {nombre : nombre,
          precio : precio,
          descripcion : descripcion,
          foto : foto,
          stock : stock,
          codigo : codigo})
          
         return actualizado

  } catch (error) {
      console.log(error)
      logger.error(error)

    //   logger.error('error al iniciar sesion')
  }
}

module.exports = {getProduct,getProductById,postProductoDb,updateProductoDb}