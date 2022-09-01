const mongoose = require('mongoose');

const mensajesCollection = 'mensajes'

const mensajesSchema = new mongoose.Schema({
    email:{type:String, require:true, max:500},
    mensaje:{type:String, require:true},
    fecha:{type:String, require:true, max:20000},
    tipo:{type:String, require:true},
  
   

})



const mensajesModel = mongoose.model(mensajesCollection, mensajesSchema)

module.exports = {mensajesModel}