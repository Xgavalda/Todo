var User = require('../model/UserModel');

//Render de la pagina
exports.index = function(req, res) 
{
	res.render('register', {title:"Registra Usuari"});
}

//Funcio que be de la pagina amb les dades
exports.registerUser = function(req, res) 
{
	//Va servir el passport per guardar user
	User.register(new User({
		username: req.body.username
	}), req.body.password, function(err, user) {
		if (err) {
			return res.render('register', {
				user: user
			});
		}
		//Redireccion a INDEX pero com que no estas logegat tornes a LOGIN.
		res.redirect('/');
	});
}