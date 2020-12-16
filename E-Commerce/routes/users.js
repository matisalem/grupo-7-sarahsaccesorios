var express = require('express');
var router = express.Router();
const {check, body, validationResult} = require('express-validator');

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
router.post("/register", [
    check('user_id').isLength({min:6}).withMessage('el nombre de usuario es muy corto'),
    check('user_mail').isEmail().withMessage('el email no es valido'),
    check('user_name').isLength({min:2}).withMessage('el nombre es muy corto'),
    check('user_lastname').isLength({min:2}).withMessage('el apellido es muy corto'),
    check('user_tel').isMobilePhone().withMessage('el numero de telefono no es valido'),
    check('user_password').isLength({min:8}).withMessage('la contrase;a es muy corta'),
    check('user_password2').isLength({min:8}).withMessage('las contrase;as no coinciden')
], usersController.store); //Vuelta del formulario - Devolución con el boton.

router.get("/reset",usersController.reset); //Ida del formulario - Presentacion de la pantalla al usuario
router.post("/reset",usersController.reset_mail); //Ida del formulario - Presentacion de la pantalla al usuario
router.get('/profile', usersController.profile)

module.exports = router;
