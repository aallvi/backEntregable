const ProductosDaoDB = require("../persistencia/productos");
// const { getProduct } = require("../persistencia/productos");


class ProductosDao {

    constructor(){
      this.productosDao = new ProductosDaoDB()

    }

    async getProduct(){
        let product;
        product = await this.productosDao.getProduct()

        return product

    }

    async getbyId(id) {
        let producto = await this.productosDao.getProductById(id)
    
        return producto
    }

    async getByCat(categoria) {
        let producto = await this.productosDao.getProductByCategoria(categoria)
    
        return producto
    }

    async  postProducto(producto) {

        let response = await this.productosDao.postProductoDb(producto)
    
        return response
    }

    async updateProducto(id,nombre,precio,descripcion,foto,stock,codigo) {

        let response = await this.productosDao.updateProductoDb(id,nombre,precio,descripcion,foto,stock,codigo)
    
        return response
    }



    async  deleteProductito(id){
   
        let response = await this.productosDao.deleteProductDb(id)
    
        return response
    
    }
    




}


module.exports = ProductosDao