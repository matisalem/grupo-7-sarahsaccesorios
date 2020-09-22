const indexController = {
    home: function(req,res,next){
        //renderizo el formulario    
        res.render ("home");
        },
    carrito: function (req,res,next){
        //Envio el carrito
        res.render ("carrito");
    },
    detalle: function (req,res,next){
        //Envio al Detalle del producto
        res.render ("detalleProducto");
    } 
}

module.exports = indexController;