var express = require('express');
var router = express.Router();

const usersController = require ('../controllers/usersController.js');

/* Perfil */
router.get('/perfil/:id',usersController.perfil);
/*muestro el login*/
router.get("/login",usersController.loginPresentar); //Ida del formulario - Presentacion de la pantalla al usuario
/*guardo el usuario logeado*/
router.post("/login",usersController.loginAceptar); //Vuelta del formulario - Devolución con el boton.

/*muestro el Registro*/
router.get("/register",usersController.register); //Ida del formulario - Presentacion de la pantalla al usuario
/*guardo el registro*/
router.post("/register",usersController.store); //Vuelta del formulario - Devolución con el boton.

router.get("/reset",usersController.reset); //Ida del formulario - Presentacion de la pantalla al usuario
router.post("/reset",usersController.reset_mail); //Ida del formulario - Presentacion de la pantalla al usuario


module.exports = router;
