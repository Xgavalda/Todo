//Variables + URL de conexio
var mongoose = require('mongoose');
var mongoDatabaseURI = 'mongodb://localhost/todolist';

//Conexio
mongoose.connect(mongoDatabaseURI);

//Si s'ha produeix un error mostral...
mongoose.connection.on('connected', function() {
	console.log('Mongoose default connection open to ' + mongoDatabaseURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose default connection disconnected');
});

// TODO: load all model files from directory model.