/**
 * New node file
 */
var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
	name: String
});
kittySchema.methods.speak = function () {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
  console.log(greeting);
};

function save(db, jsondat){
  //NOTE: methods must be added to the schema before compiling it with mongoose.model()
  
  
  var Kitten = db.model('Kitten', kittySchema);
  
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  
  //var Kitten = mongoose.model('Kitten', kittySchema);
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"
  
  fluffy.save(function (err, fluffy) {
	if (err) return console.error(err);
	fluffy.speak();
	console.log("saved ??");
  });
}

exports.saveTimesheetData = function(req, res){
	
	//res.render('index', { title: 'Express' });
	var db = req.db;
	
	var body = '';
	req.on('data', function (data) {
		body += data;
		console.log("abc" + data.toString());
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) { 
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            request.connection.destroy();
        }
    });
	
	save(db, JSON.parse(body));
};