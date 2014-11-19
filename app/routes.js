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
		
		var roasts = req.coll;

		var newRoast = req.body;

		var promise = roasts.insert(newRoast);

		promise.on('complete', function(err, doc){
			if(err) {
				console.log(err);
			}
			res.json(doc);
		});
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
	});

	//upload a photo
	app.put('api/roasts', function(req, res) {
		var data = _.pick(req.body, 'type')
        , uploadPath = path.normalize(cfg.data + '/uploads')
        , file = req.files.file;

        console.log('got to here in the routes');
        console.log(file.name); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
	    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
	});
};