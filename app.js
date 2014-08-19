
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , d3test = require('./routes/d3test')
  , tsfunc = require('./routes/timesheet_functions')
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
app.get('/d3test', d3test.index);

//ajax call
app.post('/postdata', tsfunc.saveTimesheetData);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//iosocket
var io = require('socket.io')(server);
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
var db = mongoose.createConnection('mongodb://admin:12345@localhost:27017/admin');
//Make our db accessible to our router

var db2 = db.useDb("test");
app.use(function(req,res,next){
    req.db = db2;
    next();
});

//db connect state inform
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongo connected...");
});


function saveData(data){
	
}