const { ordenesModel } = require("../models/ordenes")

const moment = require('moment')


class CarritoDb {
    constructor(){
        this.numeroOrdenes = 0
    }



    async ordenes (carrito,email,nombre,sum){

          try {
            let ordenesNum = await ordenesModel.find()
            console.log('ORDEE',ordenesNum.length)
          
            

            this.numeroOrdenes = ordenesNum.length
            // return JSON.parse(productos)
        } catch (error) {
            logger.error(error)
           
        }
        

        const orden = {
            email:email,
            productos:carrito,
            total:sum,
            estado:'generado',
            numeroOrden:this.numeroOrdenes+1,
            fecha:moment().format('MMMM Do YYYY, h:mm:ss a')

        }

        try {
        
            const ordenesSaveModel = new ordenesModel(orden)
            let ordenSave = await ordenesSaveModel.save()
            console.log(ordenSave)
            return 'grabado'
    
            
        } catch (error) {
            console.log(error)
            logger.error(error)
    
        }




    }



}


module.exports = CarritoDb