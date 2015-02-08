angular.module('RoastLogAppCtrl', [])
	.controller('roastLogAppCtrl', ['CRUD', '$scope', '$location', function (CRUD, $scope, $location) {



		//var self = this;
		$scope.roasts = [];
		$scope.newRoast = {};
		$scope.singleRoast = {};
		$scope.files = {} ;


		//this is the main get roasts function that is invoked in the other functions that follow
		//the .then stuff is to deal with the promise system.
		var fetchRoasts = function() {
			return CRUD.list().then(function(response) {
				
				$scope.roasts = response.data;

			}, function(errResponse) {
				console.log(errResponse);
			});
		};

		
		//just do it one time when the controller loads
		fetchRoasts();


		//return one roast
		$scope.fetchOneRoast = function(id) {

			
			CRUD.getRoast(id)
				.then(function(response){
					$scope.singleRoast = response.data;
					// console.log($scope.singleRoast);
					// console.log(response.data);
					$location.path('/single_roast')
				});
		};
		
		
		
		$scope.addRoast = function() {
			//console.log($scope.newRoast);
			
			//newRoast is connected on the form model in the html
			CRUD.addRoast($scope.newRoast)
			.then(fetchRoasts)
			.then(function(response){
				$scope.newRoast = {} ;
				$scope.files = {} ;
			});
		};

		//listener for fileupload
		$scope.filesChanged = function (elm) {
			$scope.files=elm.files;
			//console.log(self.files);
			$scope.$apply();
		};

		
		// $scope.test = function() {
		// 	console.log('I quit if this isn\'t happening');
		// 	console.log($scope.newRoast.bean);
		// 	console.log($scope.files);
		// };


		$scope.deleteRoast = function(id) {

			
			CRUD.deleteRoast(id)
				.then(fetchRoasts)
				.then(function(response){
					console.log(response);
				});

			//this.stopPropagation();
		};
	}])
	.controller('dfUpload', ['$upload', '$scope', function($upload, $scope){
		//console.log('not dead?');
		$scope.onFileSelect = function($files) {
			//console.log('but here?');
			//$files: an array of files selected, each file has name, size, and type.
			for (var i = 0; i < $files.length; i++) {
				var file = $files[i];

				console.log(file);

				$scope.upload = $upload.upload({
					url: '/upload', //upload.php script, node.js route, or servlet url
					method: 'POST',// or 'PUT',
				//headers: {'header-key': 'header-value'},
				//withCredentials: true,
					//data: {myObj: $scope.files},
					file: file, // or list of files ($files) for html5 only
				//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
				// customize file formData name ('Content-Disposition'), server side file variable name. 
				//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
				// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
				//formDataAppender: function(formData, key, val){}
				}).progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
				}).success(function(data, status, headers, config) {
				// file is uploaded successfully
				console.log(data);
				});
				//.error(...)
				//.then(success, error, progress); 
				// access or attach event listeners to the underlying XMLHttpRequest.
				//.xhr(function(xhr){xhr.upload.addEventListener(...)})
			}
			/* alternative way of uploading, send the file binary with the file's content-type.
			Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
			It could also be used to monitor the progress of a normal http post/put request with large data*/
			// $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
		};
	}]);



