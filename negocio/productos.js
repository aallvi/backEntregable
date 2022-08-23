const { getProduct,getProductById,postProductoDb,updateProductoDb,deleteProductDb } = require("../persistencia/productos")



async function getProductos (){

   let productos = await getProduct()

   return productos


}

async function getbyId(id) {
    let producto = await getProductById(id)

    return producto
}

async function postProducto(producto) {

    let response = await postProductoDb(producto)

    return response
}

async function updateProducto(id,nombre,precio,descripcion,foto,stock,codigo) {

    let response = await updateProductoDb(id,nombre,precio,descripcion,foto,stock,codigo)

    return response
}

async function deleteProductito(id){
   
    let response = await deleteProductDb(id)

    return response

}

module.exports = {getProductos,getbyId,postProducto,updateProducto,deleteProductito}