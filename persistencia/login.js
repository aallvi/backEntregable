const { userModel } = require("../models/user");


class loginDaoDb{

   constructor(){}


   async findEmail (email){

    try {
       const response = await userModel.findOne({email})

       return response

    } catch (error) {
        console.log(error)
    }
   }
   async saveUser (email,hashedPassword,nombre,direccion,edad,telefono){

    try {
        const newUser = new userModel({
            email:email,
            password:hashedPassword,
            nombre:nombre,
            direccion:direccion,
            edad:edad,
            telefono:telefono
        });
        await newUser.save()

    } catch (error) {
        console.log(error)
    }
   }

   async getData(email){

    try {
        let documento = await userModel.find({"email" : email})
        // console.log(documento)
      
        return documento
        // return JSON.parse(productos)
    } catch (error) {
       console.log(error)
       logger.error('error al iniciar sesion')
    }

   }

      
}

module.exports = loginDaoDb