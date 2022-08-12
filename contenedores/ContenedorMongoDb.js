const mongoose = require('mongoose');
const { productoModel } = require('../models/productos');
const { logger } = require('../server');

class ContenedorMongoDb {
   
//   constructor(nombreColeccion,esquema){
//       this.coleccion = mongoose.model(nombreColeccion, esquema)
//   }

    // async connect(){
    //     try{
    //         const url = 'mongodb+srv://alvi:12qwaszx@cafecluster.agk3g.mongodb.net/ecommerce?retryWrites=true&w=majority'
    //         let rta = await mongoose.connect(url)
    //         console.log('base de datos conectada MONGO')
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }
 

    async getAll(res){
        try {
            let productos = await productoModel.find()
            console.log(productos)
          
            res.json(productos)
            // return JSON.parse(productos)
        } catch (error) {
            logger.error(error)
           
        }
    }

    async getById(req,res){
        try {
            let productos = await productoModel.find({_id: req.params.id})
            // console.log(productos)
            console.log(req);

            res.json(productos)
        } catch (error) {
            res.json(error)
            logger.error(error)

        }
    }


    async postProduct(req,res){
        try {
            const producto = req.body
            const productoSaveModel = new productoModel(producto)
            let productoSave = await productoSaveModel.save()
            console.log(productoSave)
            res.json('granado')

            
        } catch (error) {
            console.log(error)
            logger.error(error)

        }
    
    }


    async updateProduct (req,res) {
        try {
       
        
      
            let actualizado =  await productoModel.replaceOne({"_id" : req.params.id}, 
              {nombre : req.body.nombre,
              precio : req.body.precio,
              descripcion : req.body.descripcion,
              foto : req.body.foto,
              stock : req.body.stock,
              codigo : req.body.codigo})
              
             res.json(actualizado)
  
      } catch (error) {
          console.log(error)
          logger.error(error)

        //   logger.error('error al iniciar sesion')
      }
  

    }


    async delete(req,res) {
        try {
            await productoModel.deleteMany({_id:req.params.id})
            res.json('borrado')
        } catch (error) {
            res.json(error)
            logger.error(error)

        }
    }




}

module.exports = ContenedorMongoDb

