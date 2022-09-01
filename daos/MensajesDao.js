const MensajesDB = require("../persistencia/mensajes")



class MensajesDao{

    constructor(){
        this.mensajesDb = new MensajesDB()
  
      }


    async grabarMensaje(data){

      const setmsg = await this.mensajesDb.saveMensaje(data)

      return setmsg


    }

    async getMensajes(data){

      const setmsg = await this.mensajesDb.getMsg(data)

      return setmsg


    }

}


module.exports = MensajesDao