module.exports = function(app) {

	// get all roasts
	app.get('/api/roasts', function(req, res){

		
		var roasts = req.coll;

		var promise = roasts.find();
		
		promise.on('complete', function(err, doc){
			if(err) {
	    		console.log(err);
	    	}
	    	res.json(doc);
	    });
	});


	// create roast and send back all roasts after creation
	app.post('/api/roasts', function(req, res) {

		console.log('got here in routes');
		//console.log(req.body);
		
		var roasts = req.coll;

		var newRoast = req.body;

		var promise = roasts.insert(newRoast);

		promise.on('complete', function(err, doc){
			if(err) {
				console.log(err);
			}
			res.json(doc);
		});

		// roasts.insert(newRoast, function(err, success) {
		// 	if (err) throw err;

		// 	//console.log(success);
		// });
	});





	//delete a roast
	app.delete('/api/roasts/:roast_id', function(req, res) {

		var roastIDToRemove = req.params.roast_id;

		var roasts = req.coll;

		var promise = roasts.remove({_id:roastIDToRemove});

		promise.on('complete', function(err, doc){
			if(err) {
				console.log(err);
			}
			res.json(doc);
		});
		
		// roasts.remove({_id:roastIDToRemove}, function(err, success) {
			
		// 	if(err) throw err;
		
		// });
	});
};

