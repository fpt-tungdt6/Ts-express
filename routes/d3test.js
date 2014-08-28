
/*
 * GET d3test page.
 */

exports.index = function(req, res){
  res.render('d3test', { 
	  title: 'D3JS Chart',
	  menus: ["home", "d3test", "adminlte"],
	  active: 1
  });
};