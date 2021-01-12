const fs = require ('fs');
let db = require('../database/models');
var resultadoIdProducto;
const categorias = require('../database/models/categorias');
//pongo aca el products, para poder utilizarlo en todas las funciones.
//let products = JSON.parse(fs.readFileSync (__dirname + "/../database_/products.json"));
const productsController = {
    create: function(req,res,next){
        db.Categorias.findAll()
        .then(function(Categorias){
            return res.render("products/create",{Categorias})
        })
        .catch (function(error) {
            res.send ("error2")
            //console.log (error)
         });   
        } ,
    store: function (req,res,next){
        db.Productos.create({
            nombre: req.body.product_name,
            descripcion: req.body.product_description,
            categoria_id: req.body.product_category,
            descuento: req.body.product_discount
        })
        .then(function(prueba){
            resultadoIdProducto = prueba;
        })
        .then(function(producto){
            for (var i =0 ; i< req.body.product_tamano.length; i++){
                db.Producto_Tamano.create(
                            {
                              producto_id: resultadoIdProducto.null,
                                tamano: req.body.product_tamano[i],
                                precio: req.body.product_price[i]
                            }
                        )
                        .then()
                        .then(function(tamano){
                            for (var i =0 ; i< req.body.product_color.length; i++){
                                db.Producto_Color.create(
                                    {
                                        producto_id: resultadoIdProducto.null,
                                        color: req.body.product_color[i]
                                      }      
                                )
                                .then()
                                .then(function(color){
                                    res.redirect ("/products/list");
                                })
                            }
                            
                        })
            }
            

        })
        
    },
    edit: function (req,res,next){
        let productFind;
        //busco el producto por ID
        products.forEach(function(product) {
            if(product.product_id == req.params.product_id){
                productFind = product;
                res.render ("products/edit",{product:productFind}); //renderizo el formulario con los datos del producto a editar.
            }
        });
        res.send ("No existe"); //Muestro la negativa
    },
    update: function(req,res,next){
        //busco el producto por ID para editarlo
        products.forEach(function(product) {
            if(product.product_id == req.params.product_id){
                product.product_name = req.body.product_name;
                product.product_price = req.body.product_price;
                product.product_description = req.body.product_description;
                product.product_category = req.body.product_category;
                product.product_size = req.body.product_size_numero;
                product.product_size = req.body.product_size_unidad;
                product.product_color = req.body.product_color;
                
            }
        });
        res.redirect ("/products/list"); //Muestro siempre en positivo porque si lo encontro a la ida a la vuelta tambien lo debe encontrar. 
    },
    delete: function (req,res,next){
        


        let productFind;
        //busco el producto por ID
        products.forEach(function(product) {
            if(product.product_id == req.params.product_id){
                productFind = product;
                products.find({ where: { id: productFind } })
                 .then(user => {

                    if (user) {
                 return user.destroy();
                 }
                 })
                 .then(() => {
                 console.log("Ya no existe en la BBDD.");
                 })
                 .catch(error => {
                 console.log("Error:", error);
                 });
            }
        });
        
        
        
    },
    list: function (req,res,next){
        //res.send ("prueba");
        db.Productos.findAll()
        .then(function (producto){
            res.render ("products/list",{products:producto});
        })
        .catch (function(error) {
            res.send (error)
            //console.log (error)
         }); 
        

    }
}

module.exports = productsController;