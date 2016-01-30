/*
 * Mostra la vista TOTS.EJS amb tots els objectes
 */
exports.index = function(req, res) 
{
	res.render('tots', {
		user: req.user, title: 'Tasques'
	});
};


exports.index_categoria = function(req, res)
{
  res.render('categoria', {
    user: req.user, title: 'Categoria'
  });
};
