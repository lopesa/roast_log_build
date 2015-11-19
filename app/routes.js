var fs = require('fs');

module.exports = function(app) {

	

	//get these variables outside of the function that creates them. There's got to be a more elegant way to do this!
	var uploadedFileTmpPath = '';
	var uploadedFileName = '';



	// get all roasts
	app.get('/api/roasts', function(req, res){

		var roasts = req.coll;

		var promise = roasts.find();
		
		promise.on('complete', function(err, doc){
			if(err) {
				console.log(err);
				// console.log('farts');
			}
			res.json(doc);
		});
	});

	//get one roast
	app.get('/api/roasts/:roast_id', function(req, res){

		var roastIDToGet = req.params.roast_id;

		var roasts = req.coll;

		var promise = roasts.findOne({_id:roastIDToGet});

		promise.on('complete', function(err, doc){
			if(err) {
				console.log(err);
			}
			res.json(doc);
		});
	});


	// create roast and send back all roasts after creation
	app.post('/api/roasts', function(req, res) {

		//console.log('got here in routes');

		//console.log(this.uploadedFileTmpPath);
		
		var roasts = req.coll;

		var newRoast = req.body;

		// guessing this is the image upload chunk

		var tmpPath = this.uploadedFileTmpPath;
		var targetPath = './public/img/roasts/' + this.uploadedFileName;
		

		// fs.rename(tmpPath, targetPath, function(err) {
	 //        if (err) throw err;
	 //        fs.unlink(tmpPath, function() {
	 //            if (err) throw err;
	 //            console.log('File uploaded to: ' + targetPath);
	 //    	});
		// });
		
		// var imageResourcePath = 'img/roasts/' + this.uploadedFileName;

		// newRoast.image_url = imageResourcePath;

		//

		
		
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
	//handle POST requests to /upload
	app.post('/upload', function (req, res, next) {

		this.uploadedFileTmpPath = req.files.file.path;
		console.log(this.uploadedFileTmpPath);

		this.uploadedFileName = req.files.file.name;
		console.log(this.uploadedFileName);

		res.status(200).send('tmp path and name set to external');

	});
};

