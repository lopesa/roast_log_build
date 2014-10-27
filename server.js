// modules =================================================
var express        = require('express');
var app            = express();
var router         = express.Router();
var monk           = require('monk');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config file
var config = require('./config/db'); //database location only right now

var port = process.env.PORT || 8080; // set our port. should move this to the config file


// database connection =====================================
//connect to db with monk
var db              = monk(config.url);
var coll			= db.get('roasts');


//Make our db and collection accessible to our router
app.use(function(req,res,next){
  req.db = db;
  req.coll = coll;
  next();
});


// get all data/stuff of the body (POST) parameters ========
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