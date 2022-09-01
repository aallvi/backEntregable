const { getOrdenesNeg } = require("../negocio/ordenes")




async function getByEmail(req,res) { 
   
    const email = req.params.email 

    const getOrdenes = await getOrdenesNeg(email)

    if(!getOrdenes){
        res.json('no tienes ordenes')
        return

    }

    res.json(getOrdenes)

}



module.exports = {getByEmail}