const mongoose = require('mongoose');

const ordenesCollection = 'ordenes'

const OrdenesSchema = new mongoose.Schema({
    email:{type:String, require:true, max:40},
    productos:{type:[]},
    total:{type:String, require:true, max:10000000},
    estado:{type:String , require:true},
    numeroOrden:{type:Number, require:true},
    fecha: {type:String, required: true}
  

})



const ordenesModel = mongoose.model(ordenesCollection, OrdenesSchema)

module.exports = {ordenesModel}