const fs = require ('fs');
const session = require('express-session')
let usuarioActivo;
let db = require('../database/models');
const {check, body, validationResult} = require('express-validator');
var bcrypt = require('bcrypt');

const userController = {
    perfil: function(req,res,next){
        //renderizo el formulario 
            if (res.locals.isAuthenticated) {
                    
                db.Usuarios.findOne ({
                    where: {
                        id: res.locals.usuarioLogueado.id
                            }
                    })
                .then (function(user){
                    usuarioActivo = user;
                    console.log (user)
                    //if (user) {
                        res.render ("users/perfil",{usuario:usuarioActivo});
                        
                    //}
                });                             
            }else
            {
                res.render ("users/login" )
 
            }
            
        } ,
    actualizarPerfil: function (req,res,next){

        if (usuarioActivo.nombre != req.body.user_name) { 
            console.log ("entro")
            db.Usuarios.update ({
                nombre: req.body.user_name
                    },
                {where:{id: req.body.user_id} 
                })
            
            }
        if (usuarioActivo.apellido != req.body.user_lastname) { 
                db.Usuarios.update ({
                    apellido: req.body.user_lastname
                        },
                    {where:{id: req.body.user_id} 
                    })
                }
        if (usuarioActivo.telefono != req.body.user_tel) { 
            db.Usuarios.update ({
                telefono: req.body.user_tel
                    },
                {where:{id: req.body.user_id} 
                })
            }
        if (req.body.user_password != ""){
            db.Usuarios.update ({
                contrasena: bcrypt.hashSync(req.body.user_password, 10)
                    },
                {where:{id: req.body.user_id} 
                })
            } 
        
        res.redirect ("../")
    },
    loginPresentar: function (req,res,next){

            if (res.locals.isAuthenticated) {
                
                db.Usuarios.findOne ({
                    where: {
                        id: res.locals.usuarioLogueado.id
                            }
                    })
                .then (function(user){
                    usuarioActivo = user;
                    //if (user) {
                        res.redirect ("perfil/"+usuarioActivo.id)
                        
                    //}
                });                             
            }else
            {
                res.render ("users/login" )
                
                
            }
            
        },

    loginAceptar: function (req, res, next) {
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.render("users/login", { errors: errors.errors })
            }
    
            db.Usuarios.findOne({
                where: {
                    user_name: req.body.user_id
                }
            })
                .then(function (usuario) {
                    if (!usuario) {
                        res.render("users/login", { errors: "Usuario invalido." });
                    } else {
                        if (bcrypt.compareSync(req.body.user_password, usuario.contrasena)) {
                            req.session.usuarioLogueado = usuario
                            if (req.body.remember == undefined) {
                                res.cookie('remember', req.body.user_id, { maxAge: 300000 })                                
                            }
                            res.redirect('/');  
                        } else {
                            res.render("users/login", { errors: "Contraseña invalida." });
                        }
                    }
    
                })
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
                console.log ("entro")
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
        db.Usuarios.update ({
            contrasena: bcrypt.hashSync("123456", 10)
                },
               {where:{email: req.body.user_email} 
            })
        res.redirect ("../");
    }
}

module.exports = userController;