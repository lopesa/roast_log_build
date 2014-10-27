// modules =================================================
var express        = require('express');
var app            = express();
var router         = express.Router();
var monk           = require('monk');
//var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config file
var config = require('./config/db');

var port = process.env.PORT || 8080; // set our port

 // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
// var db = mongoose.connect(config.url, function(err) {
// 	if (err) {
// 		console.error('\x1b[31m', 'Could not connect to MongoDB!');
// 		console.log(err);
// 	}
// });

//connect to db with monk
var db              = monk(config.url);
var coll			= db.get('roasts');
//var roasts          = db.get('roasts');

//console.log(roasts);

//Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  req.coll = coll;
  next();
});


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users







// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app