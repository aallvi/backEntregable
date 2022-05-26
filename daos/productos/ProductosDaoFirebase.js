const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");



class ProductosDaoFirebase extends ContenedorFirebase {
       constructor(){
           super('productos',{
            nombre:{type:String, require:true, max:40},
            descripcion:{type:String, require:true, max:100},
            codigo:{type:String, require:true, max:10},
            foto:{type:String, require:true, max:100},
            precio:{type:Number, require:true, max:100},
            stock:{type:Number, require:true, max:100},
               
           })
       }

}

module.exports = ProductosDaoFirebase

