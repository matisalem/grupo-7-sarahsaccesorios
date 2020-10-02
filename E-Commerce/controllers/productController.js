const fs = require ('fs');
//pongo aca el products, para poder utilizarlo en todas las funciones.
let products = JSON.parse(fs.readFileSync (__dirname + "/../database/products.json"));

const productsController = {
    create: function(req,res,next){
        //renderizo el formulario    
        res.render ("products/create");
        } ,
    store: function (req,res,next){
            
            //Tomo los datos del body. Tomo el producto como objeto
            let newProducts = req.body;
            //Casteo los campos - Porque aun que el tipo sea number viene como string
            newProducts.product_id = Number (req.body.product_id);
            //Agrego propiedad en el la variable
            products.productsStock = 0;
            //cargo los productos en la variable
            products.push (newProducts);
            //cargo la variable completa en el JSON
            fs.writeFileSync (__dirname + "/../database/products.json",JSON.stringify(products));
            // muestro respuesta al usuario
            res.redirect ("/products/list");
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
                product.product_nombre = req.body.product_nombre;
                product.product_price = req.body.product_price;
                product.product_description = req.body.product_description;
                product.product_category = req.body.product_category;
                product.product_size = req.body.product_size;
                product.product_color = req.body.product_color;
                
            }
        });
        res.redirect ("/products/list"); //Muestro siempre en positivo porque si lo encontro a la ida a la vuelta tambien lo debe encontrar. 
    },
    delete: function (req,res,next){
        let newProducts = products.filter (function (product){
            return product.product_id != req.params.product_id;
        });

        //cargo la variable completa en el JSON - de los nuevos productos con el que quiero borrar filtrado
        fs.writeFileSync (__dirname + "/../database/products.json",JSON.stringify(newProducts));
        // muestro respuesta al usuario
        res.redirect ("/products/list");
    },
    list: function (req,res,next){
        //res.send ("prueba");
        res.render ("products/list",{products});
    }
}

module.exports = productsController;