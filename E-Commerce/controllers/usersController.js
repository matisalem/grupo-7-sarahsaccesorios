const fs = require ('fs');
let usuarioActivo = JSON.parse(fs.readFileSync (__dirname + "/../database_/usuarioActivo.json"));
let usuarios = JSON.parse(fs.readFileSync (__dirname + "/../database_/users.json"));
const {check, body, validationResult} = require('express-validator');
const { RSA_NO_PADDING } = require('constants');
let db = require('../database/models');

const userController = {
    perfil: function(req,res,next){
        //renderizo el formulario 
            res.render ("users/perfil");
        } ,
    loginPresentar: function (req,res,next){
            res.render ("users/login",{erroralLoguear: ""})
        },
    loginAceptar: function (req,res,next){
             //Tomo los datos del body. Tomo el usuario como objeto
             let usuarioActivar = req.body;
             //Casteo los campos - Porque aun que el tipo sea number viene como string
             db.Usuarios.findOne(
                {where : {user_name: usuarioActivar.user_id,
                        contrasena : usuarioActivar.user_password           
                }  }
            )
            .then(function(usuario){
                console.log (usuario)
                if (usuario != null) {
                    req.session.usuarioLogueado = usuario.user_name;
                    if (req.body.remember != undefined) {
                        res.cookie('remember', usuario.user_name, { maxAge: 300000 })
                    }
                    res.redirect ("../")
                }else   
                {
                    res.render ("users/login", {erroralLoguear: "Usuario o contraseña invalidos"})
                }
               
            })
            .catch (function(error) {
                res.send ("No existe el usuario")
                //console.log (error)
             }); 
        },
    register: function (req,res,next){
        res.render ("users/register")
    },
    store: function (req,res,next){
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("users/register", { errors: errors.errors })
        }
        //busco si ya existe el email en la BD, si no existe entonces guardo el nuevo usuario
        db.Usuarios.findOne({
            where: {
                email: req.body.user_mail
            }
        })
            .then(function (usuario) {
                if (!usuario) {
                    db.Usuarios.create({
                        user_name: req.body.user_id,
                        nombre: req.body.user_name,
                        apellido: req.body.user_lastname,
                        email: req.body.user_mail,
                        contrasena: bcrypt.hashSync(req.body.user_password, 10),
                        telefono: req.body.user_tel
                    })
                        .then(function (usuario) {
                            usuario.id = usuario.null
                            req.session.usuarioLogueado = usuario
                            console.log(req.session.usuarioLogueado)
                            res.redirect('/');
                        })
                } else {
                    res.render("users/register", { errorAlLoguear: "Ya hay una cuenta con ese mail" });
                }
            })

    },
    reset: function (req,res,next){
        res.render ("users/reset");

    },
    reset_mail: function (req,res,next){
        res.redirect ("../");
    }
}

module.exports = userController;