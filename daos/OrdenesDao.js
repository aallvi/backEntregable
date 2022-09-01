const OrdenesDB = require("../persistencia/ordenes")


class OrdenesDao{

    constructor(){
        this.ordenesDb = new OrdenesDB()
    }

   
    async getbyEmail(email) {
        let ordenes = await this.ordenesDb.getOrdenesEmail(email)
    
        return ordenes
    }


}



module.exports = OrdenesDao