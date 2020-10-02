var express = require('express');
var router = express.Router();

const indexController = require ('../controllers/indexController.js');

/* GET home page. */
router.get('/',indexController.home);

//Ir al carrito
router.get ('/carrito',indexController.carrito);

router.get ('/detalleproducto/:id?', indexController.detalle);

module.exports = router;