var express = require('express');
var router = express.Router();

const indexController = require ('../controllers/indexController.js');
const adminM = require('../middlewares/adminM');
const authM = require('../middlewares/authM');
const guestM = require('../middlewares/guestM');

/* GET home page. */
router.get('/',indexController.home);

//Ir al carrito
router.get ('/carrito', authM, indexController.carrito);

router.get ('/detalleproducto/:id?', indexController.detalle);

module.exports = router;
