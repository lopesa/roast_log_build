angular.module('RoastLogAppCtrl', [])
	.controller('roastLogAppCtrl', ['CRUD', function (CRUD) {


		var self = this;
		self.roasts = [];
		self.newRoast = {};

		self.filesChanged = function (elm) {
			self.files=elm.files;
			console.log(self.files);
			//self.$apply();
		};

		
		//this is the main get roasts function that is invoked in the other functions that follow
		//the .then stuff is to deal with the promise system.
		var fetchRoasts = function() {
			return CRUD.list().then(function(response) {
				
				self.roasts = response.data;

			}, function(errResponse) {
				console.log(errResponse);
			});
		};

		
		//just do it one time when the controller loads
		fetchRoasts();
		
		
		
		self.addRoast = function() {

			//newRoast is connected on the form model in the html
			CRUD.addRoast(self.newRoast)
				.then(fetchRoasts)
				.then(function(response){
					self.newRoast = {} ;
				});
		};

		self.test = function() {
			console.log('I quit if this isn\'t happening');
			console.log(self.newRoast.bean);
			console.log(self.files);
		};


		self.deleteRoast = function(id) {

			
			CRUD.deleteRoast(id)
				.then(fetchRoasts)
				.then(function(response){
					console.log(response);
				});
		};
	}]);
	// .controller('dfUpload', ['$upload', function($upload){
	// 	var self = this;
	// 	//console.log('not dead?');
	// 	self.onFileSelect = function($files) {

	// 		console.log('but here?');


	// 		//$files: an array of files selected, each file has name, size, and type.
	// 		for (var i = 0; i < $files.length; i++) {
	// 			var file = $files[i];
	// 			self.upload = $upload.upload({
	// 				url: '/api/roasts', //upload.php script, node.js route, or servlet url
	// 				method: 'PUT', //or 'POST' 
	// 				//headers: {'header-key': 'header-value'},
	// 				//withCredentials: true,
	// 				data: {myObj: self.imageUpload},
	// 				file: file, // or list of files ($files) for html5 only
	// 				//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
	// 				// customize file formData name ('Content-Disposition'), server side file variable name. 
	// 				//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
	// 				// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
	// 				//formDataAppender: function(formData, key, val){}
	// 			}).progress(function(evt) {
	// 			console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	// 			}).success(function(data, status, headers, config) {
	// 			// file is uploaded successfully
	// 			console.log(data);
	// 			});
	// 			console.log('got here in the controller')
	// 			//.error(...)
	// 			//.then(success, error, progress); 
	// 			// access or attach event listeners to the underlying XMLHttpRequest.
	// 			//.xhr(function(xhr){xhr.upload.addEventListener(...)})
	// 		}
	// 		/* alternative way of uploading, send the file binary with the file's content-type.
	// 			Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
	// 			It could also be used to monitor the progress of a normal http post/put request with large data*/
	// 		// $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
	// 	};
	// }]);