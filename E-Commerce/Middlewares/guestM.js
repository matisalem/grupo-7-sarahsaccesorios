let guestM = function (req, res, next) {
    if (req.session.usuarioLogueado) {
        res.locals.isAuthenticated = true
        res.locals.usuarioLogueado = req.session.usuarioLogueado
        res.send("estas logueado")
    } else {
        res.locals.isAuthenticated = false;

        next();
    }

}

module.exports = guestM