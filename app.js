var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    //methodOverride = require('method-override');
    //cons = require('consolidate'),
    // MongoClient = require('mongodb').MongoClient,
    // Server = require('mongodb').Server;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
//app.engine('html', cons.swig);
//app.set('view engine', 'html');
//app.set('views', __dirname + '/views');

require('./public/js/routes.js')(app);
// require('./public/js/controllers.js')(app);


app.listen(8080);
console.log('Express server started on port 8080');