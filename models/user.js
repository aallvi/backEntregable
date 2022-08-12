const mongoose = require('mongoose');

const userCollection = 'user'

const usersSchema = new mongoose.Schema({
    email:{type:String, require:true, max:50},
    password:{type:String, require:true, max:10},
    nombre:{type:String, require:true, max:20},
    direccion:{type:String, require:true, max:40},
    edad:{type:Number, require:true, max:100},
    telefono:{type:Number, require:true, max:100000000000},
    foto:{type:String, require:false, max:100000000000},
   

})



const userModel = mongoose.model(userCollection, usersSchema)

module.exports = {userModel}