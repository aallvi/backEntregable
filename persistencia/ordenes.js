const { ordenesModel } = require("../models/ordenes")


class OrdenesDB{

     
    async getOrdenesEmail (email){

        try {
            let ordenes = await ordenesModel.find({email})
            // console.log(productos)
            // console.log(req);
    
            return ordenes
        } catch (error) {
            console.log(error)
            // logger.error(error)
    
        }
    }

    
}


module.exports = OrdenesDB