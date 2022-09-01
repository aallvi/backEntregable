const loginDaoDb = require("../persistencia/login")


class LoginDao{

    constructor(){
        this.loginDao = new loginDaoDb()
    }

    async findMail (email){
        const response = await this.loginDao.findEmail(email)

        return response
    }

    async getData (email){
        const response = await this.loginDao.getData(email)

        return response
    }

    async saveUser(email,hashedPassword,nombre,direccion,edad,telefono){

        const response = await this.loginDao.saveUser(email,hashedPassword,nombre,direccion,edad,telefono)

        return response



    }




}


module.exports = LoginDao