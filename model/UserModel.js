//Aquesta funcio fa servir MONGOOSE per guardar el registre del PASSPORT LOCAL
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({});

UserSchema.plugin(passportLocalMongoose);

//¿? Crea un model igual passportlocal per guardar-se
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;