module.exports = function(app) {

	var aws = require('aws-sdk');

	var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
	var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
	var S3_BUCKET = process.env.S3_BUCKET;

	/////////////////////////////////////
	//
	// get all roasts
	//
	/////////////////////////////////////
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

	/////////////////////////////////////
	//
	//get one roast
	//
	/////////////////////////////////////
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

	/////////////////////////////////////
	//
	// create roast and send back all roasts after creation
	//
	/////////////////////////////////////
	app.post('/api/roasts', function(req, res) {

		//console.log('got here in routes');
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

	/////////////////////////////////////
	//
	//delete a roast
	//
	/////////////////////////////////////
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

	/////////////////////////////////////
	//
	// sign amazon s3 certs
	//
	/////////////////////////////////////
	app.get('/sign_s3', function(req, res){
		
		// console.log(req.query.file_name);
		aws.config.update({
			accessKeyId: AWS_ACCESS_KEY,
			secretAccessKey: AWS_SECRET_KEY
		});
		
		var s3 = new aws.S3();
    var s3_params = {
      Bucket: S3_BUCKET,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: "multipart/form-data",
      ACL: 'public-read',
    };

		s3.getSignedUrl('putObject', s3_params, function(err, data){
			// console.log(data)
			if(err){
        console.log(err);
      }
      else{
        var return_data = {
          signed_request: data,
          url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
        };
        res.write(JSON.stringify(return_data));
        res.end();
      }
    });
	});
};