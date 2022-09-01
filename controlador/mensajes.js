const { setMensajeNeg, getMsg } = require("../negocio/mensaje")





async function setMensaje(req,res){

    let data= req.body.data
   

     const setmsg = await setMensajeNeg(data)

     res.json(setmsg)  
     
}

async function getMensajes(req,res){

    let email= req.params.email
   

     const setmsg = await getMsg(email)

     res.json(setmsg)  
     
}




module.exports = {setMensaje,getMensajes}