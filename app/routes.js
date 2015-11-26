



module.exports = function(app) {

	var fs = require('fs');
	var aws = require('aws-sdk');

	var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
	var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

	// var AWS_ACCESS_KEY = 'AKIAJB7OKBCFMUMJHEEQ'
	// var AWS_SECRET_KEY = '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'
	var S3_BUCKET = process.env.S3_BUCKET;
	// var S3_USER = process.env.AWS_PROFILE;


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
	// sign amazon s3 certs
	app.get('/sign_s3', function(req, res){
		
		// console.log("called the amazon s3 function");
		// console.log(req.query.file_name);

		aws.config.update({
			accessKeyId: AWS_ACCESS_KEY,
			secretAccessKey: AWS_SECRET_KEY
			// region: ''
			// sslEnabled: false
			// region: 'Northern California'
			// httpOptions: {agent: https.Agent}
		});

		// RoleArn: 'arn:aws:iam::584611640131:user/coffee-app-file-upload',

		// var util = require('util');

		// aws.config.credentials.get(function(err) {
		//   if (err) console.log(err);
		//   else console.log(util.inspect(aws.config.credentials, true, depth=2));
		//   // else console.log(aws.config.credentials);
		// });
		
		var s3 = new aws.S3();
    var s3_params = {
      // Bucket: S3_BUCKET,
      Bucket: 'coffee-app-image-uploads',
      Key: req.query.file_name,
      // Key: "nospaces",
      Expires: 60,
      // ContentType: req.query.file_type,
      ContentType: "multipart/form-data",
      ACL: 'public-read',
    };
    // console.log(s3_params);
		// res.send('called the amazon s3 function')
		s3.getSignedUrl('putObject', s3_params, function(err, data){
			// console.log(data)
			if(err){
				console.log('it"s failing here')
        console.log(err);
      }
      else{
        var return_data = {
          signed_request: data,
          url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
        };
        // console.log(return_data);
        res.write(JSON.stringify(return_data));
        res.end();
      }
    });
	});
};

