let adminM = function (req,res,next){
    if(req.session.usuarioLogueado.email == 'matiassalem17@gmail.com'){
        res.locals.isAdmin = true
        res.locals.adminLogueado = req.session.usuarioLogueado 
        next();
    } else {
        res.render('error');
    }
      
}

module.exports = adminM;
