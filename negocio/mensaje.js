
const MensajesDao = require("../daos/MensajesDao")



const mensajesDao = new MensajesDao()




async function setMensajeNeg(data){

     
    const grabarMsg = await mensajesDao.grabarMensaje(data)

    return grabarMsg

}

async function getMsg(email){

     
    const getMs = await mensajesDao.getMensajes(email)

    return getMs

}



module.exports = {setMensajeNeg,getMsg}