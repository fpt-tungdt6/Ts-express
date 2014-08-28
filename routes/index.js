
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
	  title: 'This is Express title',
	  menus: ["home", "d3test", "adminlte"],
	  active: 0
  });
};

exports.adminlte = function(req, res){
  res.render('adminlte', { 
	  title: 'This is Express title',
	  menus: ["home", "d3test", "adminlte"],
	  active: 2
  });
};