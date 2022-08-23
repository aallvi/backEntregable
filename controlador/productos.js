

const {getProductos,getbyId,postProducto,updateProducto} = require('../negocio/productos.js')


async function getAll(req,res){

   const productos =  await getProductos()
   res.json(productos)


}


async function getById(req,res){
   let id = req.params.id

   const productos =  await getbyId(id)
   res.json(productos)


}


async function postProduct(req,res){

   const producto = req.body


   const productos =  await postProducto(producto)
   res.json(productos)


}


async function updateProduct(req,res){

   const id =           req.params.id
    const nombre =      req.body.nombre
    const precio =      req.body.precio
    const descripcion = req.body.descripcion
    const foto =        req.body.foto
    const stock =       req.body.stock
    const codigo =      req.body.codigo


   const productos =  await updateProducto(id,nombre,precio,descripcion,foto,stock,codigo)
   res.json(productos)


}






module.exports = {getAll, getById,postProduct,updateProduct}

