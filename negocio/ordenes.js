const OrdenesDao = require("../daos/OrdenesDao");


const ordenesDao = new OrdenesDao()


async function getOrdenesNeg(email){

    const getOrden = await ordenesDao.getbyEmail(email)


    return getOrden



}

module.exports = {getOrdenesNeg}