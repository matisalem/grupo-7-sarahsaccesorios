const indexController = {
    home: function(req,res,next){
        //renderizo el formulario    
        res.render ("home");
        },
    carrito: function (req,res,next){
        //Envio el carrito
        res.render ("carrito");
    } 
}

module.exports = indexController;