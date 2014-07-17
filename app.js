
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);

//iosocket
var io = require('socket.io')(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  // proceed timesheet data
  socket.on("timesheetdata", function (data){
	console.log(data);
  });
});


/*
 * MongoDB
 * getting-started.js
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongo connected...");
  
  // yay!
  var kittySchema = mongoose.Schema({
    name: String
  });
  
  //NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };
  
  var Kitten = mongoose.model('Kitten', kittySchema);
  
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  
  //var Kitten = mongoose.model('Kitten', kittySchema);
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"
  
  fluffy.save(function (err, fluffy) {
	if (err) return console.error(err);
	fluffy.speak();
  });
});*/

function saveData(data){
	
}