var express = require ('express');
var router = express.Router ();

const productsController = require ('../controllers/productController.js');


// Dar de alta un producto
router.get("/create",productsController.create); //Ida del formulario - Presentacion de la pantalla al usuario
router.post("/create",productsController.store); //Vuelta del formulario - Devolución con el boton.
// Modificar un producto
router.get("/edit/:product_id",productsController.edit); //Ida del formulario - Presentacion de la pantalla al usuario -- Le envio por get el id del producto a modificar.
router.post("/edit/:product_id",productsController.update); //Vuelta del formulario - Devolución con el boton.
// Baja de un producto
router.get("/delete/:product_id",productsController.delete); //Ida del formulario 

//Lista de productos
router.get("/list",productsController.list); //Ida del formulario 

module.exports = router;
