
module.exports = function(app) {

	var MongoClient = require('mongodb').MongoClient;
	var Server = require('mongodb').Server;
	var mongoclient = new MongoClient(new Server("localhost", 27017));
	var db = mongoclient.db('roast_log_app');

	
	// get all roasts
	app.get('/api/roasts', function(req, res){

	    db.collection("roasts").find().toArray(function(err, docs) {
	    	if(err) throw err;

	    	res.json(docs);
	    });
	
	});

	// create roast and send back all roasts after creation
	app.post('/api/roasts', function(req, res) {

		//console.log('got here in routes');
		//console.log(req.body);

		var newRoast = req.body;

		db.collection("roasts").insert(newRoast, function(err, success) {
			if (err) throw err;

			console.log(success);
				
			// get and return all the todos after you create another
			db.collection("roasts").find().toArray(function(err, docs) {
		    	if(err) throw err;

		    	res.json(docs);
		    });
		});

	});

	//delete a roast

	app.delete('/api/roasts/:todo_id', function(req, res) {

		var roastIDToRemove = req.params.todo_id;
		
		//console.log('got here in routes');
		//console.log(req.params.todo_id);

		//var query = '"_id" : ObjectId("' + showIDToRemove + '")';

		var ObjectID=require('mongodb').ObjectID;

		//console.log(query);

		db.collection("roasts").remove({_id:ObjectID(roastIDToRemove)}, function(err, success) {
			if(err) throw err;
			//console.log('err =' + err);
			//console.log('success =' + success);
			//console.log(res);
			//res.json(docs);

			db.collection("roasts").find().toArray(function(err, docs) {
		    	if(err) throw err;
		    	//console.log('it even got here!');
		    	//console.log(docs);

		    	res.json(docs);
		    });

		});

		// Todo.remove({
		// 	_id : req.params.todo_id
		// }, function(err, todo) {
		// 	if (err)
		// 		res.send(err);

		// 	// get and return all the todos after you create another
		// 	Todo.find(function(err, todos) {
		// 		if (err)
		// 			res.send(err)
		// 		res.json(todos);
		// 	});
		// });
	});

	

	mongoclient.open(function(err, mongoclient) {

    if(err) throw err;

	});



}

