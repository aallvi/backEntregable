const ProductosDao = require("../daos/ProductosDao")
const { getProduct,getProductById,postProductoDb,updateProductoDb,deleteProductDb } = require("../persistencia/productos")


const productosDao = new ProductosDao()

async function getProductos (){

   let productos = await productosDao.getProduct()

   return productos


}

async function getbyId(id) {
    let producto = await productosDao.getbyId(id)

    return producto
}


async function getbyCategorias(categoria) {
    let productos = await productosDao.getByCat(categoria)

    return productos
}

async function postProducto(producto) {

    let response = await productosDao.postProducto(producto)

    return response
}




async function updateProducto(id,nombre,precio,descripcion,foto,stock,codigo) {

    let response = await productosDao.updateProducto(id,nombre,precio,descripcion,foto,stock,codigo)

    return response
}



async function deleteProductito(id){
   
    let response = await productosDao.deleteProductito(id)

    return response

}

module.exports = {getProductos,getbyId,postProducto,updateProducto,deleteProductito,getbyCategorias}