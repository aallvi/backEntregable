const { mensajesModel } = require("../models/mensajes")

class MensajesDB{


    async saveMensaje(data){


        try {
        
            const mensajesSaveModel = new mensajesModel(data)
            let mensajesSave = await mensajesSaveModel.save()
            console.log(mensajesSave)
            return 'grabado'
    
            
        } catch (error) {
            console.log(error)
            logger.error(error)
    
        }




    }

    async getMsg(email){


        try {
            let mensajes = await mensajesModel.find({email: email})
            // console.log(productos)
            // console.log(req);
    
            return mensajes
        } catch (error) {
            // res.json(error)
            logger.error(error)
            console.log(error)
    
        }




    }


}


module.exports = MensajesDB