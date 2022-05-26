const mongoose = require('mongoose');

const productosCollection = 'productos'

const ProductosSchema = new mongoose.Schema({
    nombre:{type:String, require:true, max:40},
    descripcion:{type:String, require:true, max:100},
    codigo:{type:String, require:true, max:10},
    foto:{type:String, require:true, max:100},
    precio:{type:Number, require:true, max:100},
    stock:{type:Number, require:true, max:100},

})



const productoModel = mongoose.model(productosCollection, ProductosSchema)

module.exports = {productoModel}