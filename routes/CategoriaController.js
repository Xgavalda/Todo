var TodoCategoria = require('../model/CategoriaModel');

/**
 * Find all todos by userId
 * @param  {Object} req request
 * @param  {Object} res response
 */
function findAllCategoriesByUser(req, res) {
  var userId = req.user.id;

  TodoCategoria.find()
    .where('creator')
    .equals(userId)
    .sort('date')
    .exec(function(err, totesAllCategoria) {
      if (err) {
        res.send(err);
      }
      res.json(totesAllCategoria);
    });
}


exports.totesAllCategoria = findAllCategoriesByUser;


//Funcio que ve de la pagina HTML 
exports.createCategories = function(req, res) 
{
  //Objete el user.id i el texta i el guarda
  var userId = req.user.id;
  var textTodo = req.body.text;

  //Guarda en la DB i funcio que mostra tots els Tasques...
  TodoCategoria.create({
    text: textTodo,
    done: false,
    creator: userId
  }, function(error, todo) {
    if (error) {
      res.send(error);
    }
    findAllCategoriesByUser(req, res);
  });
}


// exports.deleteTodo = function(req, res) {
//   Todo.remove({
//     _id: req.params.todo_id
//   }, function(error, todo) {
//     if (error) {
//       res.send(error);
//     }
//     findAllTodosByUser(req, res);
//   });
// }