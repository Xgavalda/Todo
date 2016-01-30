var mongoose = require('mongoose');

//Esquema de Categoria
var CategoriaSchema = new mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now       //Guarda la date amb el valor d'avui
  },
  done: {
    type: Boolean,
    default: false          //Valor si esta fet
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'             //Fa referencia al objecta USER
  }
});

var CategoriaModel = mongoose.model('Categoria', CategoriaSchema);

module.exports = CategoriaModel;