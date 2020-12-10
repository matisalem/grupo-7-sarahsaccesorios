const fs = require ('fs');
const session = require('express-session')
let usuarioActivo = JSON.parse(fs.readFileSync (__dirname + "/../database_/usuarioActivo.json"));
let usuarios = JSON.parse(fs.readFileSync (__dirname + "/../database_/users.json"));
const {check, body, validationResult} = require('express-validator');


const userController = {
    perfil: function(req,res,next){
        //renderizo el formulario 
            res.render ("users/perfil");
        } ,
    loginPresentar: function (req,res,next){
            res.render ("users/login")
        },
    loginAceptar: function (req,res,next){
             //Tomo los datos del body. Tomo el usuario como objeto
             let usuarioActivar = req.body;
             //Casteo los campos - Porque aun que el tipo sea number viene como string
            
            //busco el usuario por ID para logearlo
            usuarios.forEach(function(usuario) {
                if(usuario.user_id == usuarioActivar.user_id){
                    if(usuario.user_password == usuarioActivar.user_password){
                        res.send ("Hola " + usuario.user_name + "Gracias por logearte");
                        usuarioActivar.user_id = Number (req.body.user_id);
                        //cargo la variable completa en el JSON
                        fs.writeFileSync (__dirname + "/../database_/usuarioActivo.json",JSON.stringify(usuarioActivar));
                    }else{
                        res.send ("Contraseña Invalida")
                    }
                req.session.usuarioLogueado = usuario;
                }
            });
             // muestro respuesta al usuario cuando no existe
             res.send ("El nombre de usuario no existe")
        },
    register: function (req,res,next){
        res.render ("users/register")
    },
    store: function (req,res,next){
        let errors = validationResult(req);

        if (errors.isEmpty()){

        let newUsuario = req.body;
        newUsuario.user_id = Number (req.body.user_id);
        usuarios.push (newUsuario);
        fs.writeFileSync (__dirname + "/../database_/users.json",JSON.stringify(usuarios));
        res.send ("Alta exitosa!!!!");

    } else{
        res.render('users/register', {errors: errors.errors})
    }

    },
    reset: function (req,res,next){
        res.render ("users/reset");

    },
    reset_mail: function (req,res,next){
        res.redirect ("../");
    }
}

module.exports = userController;