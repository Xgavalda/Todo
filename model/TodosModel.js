var mongoose = require('mongoose');

//Esquema de Todo
var TodoSchema = new mongoose.Schema({
	text: String,
	date: {
		type: Date,
		default: Date.now				//Guarda la date amb el valor d'avui
	},
	done: {
		type: Boolean,
		default: false					//Valor si esta fet
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'							//Fa referencia al objecta USER
	}
});

var TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;