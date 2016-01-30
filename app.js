//Express
var express = require('express');

//Controlador pagina INDEX
var indexController = require('./routes/IndexController');
//Controlador exporta Funcio i Registre 
var todosController = require('./routes/TodosController');
//Controlador de les funcion de ENREGISTRA un usuari... [Index, registeRUser]
var registerController = require('./routes/RegisterController');
//Controlador de les funcion de ENREGISTRA un usuari... [Index, registeRUser]
var categoriaController = require('./routes/CategoriaController');

var http = require('http');
var path = require('path');
var app = express();

//Parametres de conexio a DB
var db = require('./config/database');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var security = require('./config/security');
var User = require('./model/UserModel');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// passport initialize
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(require('less-middleware')({
	src: path.join(__dirname, 'public')
}));

//Carpeta public oberta estatica
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Mostra la pagina login.ejs ->/LOGIN ->/REGISTER
app.get('/login', function(req, res) {
  //Al fer servi plantilles tinc que enviar el titul de la pagina.
	res.render('login', {title:"Login"});
});

//Despres de logegar-te si es correcta a TODOS i si no a LOGIN un altre cop ;-)
app.post('/login', passport.authenticate('local', {
	successRedirect: '/todos',
	failureRedirect: '/login'
}));

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

//Si entres a "/" redireccio a LOGIN
app.get('/', function(req, res) {
	res.redirect('/login')
})

//PAGINA -> de enregistra USER passa el control a REGISTERCONTROLLER solament fa el render de la pagina
app.get('/register', registerController.index);
//GRAVA -> el usuari amb el REGISTRE..
app.post('/register', registerController.registerUser);

app.all('/api/*', security.ensureAuthenticated);
app.all('/todos', security.ensureAuthenticated);
app.all('/categories', security.ensureAuthenticated)

app.get('/todos', indexController.index);
app.get('/categories', indexController.index_categoria)

app.get('/api/todos', todosController.allTodos);
app.post('/api/todos', todosController.createTodo);

app.get('/api/todosCat', categoriaController.totesAllCategoria);
app.post('/api/todosCat', categoriaController.createCategories);

app.delete('/api/todos/:todo_id', todosController.deleteTodo);

//Arranca el servidor en el port INDICAT
http.createServer(app).listen(app.get('port'), function() {
  //Envia missatge d'on esta el servidor i el port.
	console.log('Express server listening on port ' + app.get('port'));
});