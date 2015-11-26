angular.module('RoastLogAppCtrl', [])
	.controller('roastLogAppCtrl', ['CRUD', '$scope', '$location', function (CRUD, $scope, $location) {

		//var self = this;
		$scope.roasts = [];
		// $scope.newRoast = {};
		$scope.singleRoast = {};
		
		$scope.files = {} ;

		//modal
		$scope.modalShown = false;
		// $scope.toggleModal = function() {
		// 	$scope.modalShown = !$scope.modalShown;
		// };

		$scope.showModal = function() {
            this.modalShown = true;
          };


		//this is the main get roasts function that is invoked in the other functions that follow
		//the .then stuff is to deal with the promise system.
		
		// return all roasts
		var fetchRoasts = function() {
			return CRUD.list().then(function(response) {
				
				$scope.roasts = response.data;

			}, function(errResponse) {
				console.log(errResponse);
			});
		};

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
		
		// add a roast
		// $scope.addRoast = function() {
		// 	//console.log($scope.newRoast);
			
		// 	//newRoast is connected on the form model in the html
		// 	CRUD.addRoast($scope.newRoast)
		// 	.then(fetchRoasts)
		// 	.then(function(response){
		// 		$scope.newRoast = {} ;
		// 		$scope.files = {} ;
		// 	});
		// };

		//listener for fileupload
		// $scope.filesChanged = function (elm) {
		// 	$scope.files=elm.files;
		// 	//console.log(self.files);
		// 	$scope.$apply();
		// };

		$scope.deleteRoast = function(id) {

			CRUD.deleteRoast(id)
				.then(fetchRoasts)
				.then(function(response){
					console.log(response);
				});
			//this.stopPropagation();
		};

		// get all roasts when the controller loads
		fetchRoasts();
	}])
	// =================================
	//
	//
	// add roast controller
	//
	//
	//==================================
	.controller('addRoastCtrl', ['CRUD', '$scope', '$http', function (CRUD, $scope, $http) {

		console.log("newRoast = " + $scope.newRoast);
		
		$scope.newRoast = {
			// only need these two live for defaults
			// the rest are to show what the model looks like
			// as coming in from the view
			roaster_warm: false,
			country: "Bean Origin"
			// time: {
			// 	bottom: "1:30",
			// 	yellow: "5:00",
			// 	brown: "8:00",
			// 	first_crack_start: "9:00",
			// 	first_crack_end: "10:30",
			// 	second_crack_start: "11:30",
			// 	end: "13:00"
			// },
			// temp: {
			// 	drop: 180,
			// 	bottom: 130,
			// 	yellow: 230,
			// 	brown: 300,
			// 	first_crack_start: 370,
			// 	first_crack_end: 405,
			// 	second_crack_start: 415,
			// 	end: 420
			// },
			// temp_per_minute: [180,200,220,240,260,280,300,320,340,360,380,400,420],
			// roast_notes: "Roast Notes",
			// taste_notes: "Taste Notes"
		};

		//dropdown presets
		$scope.countries = [
			"Ethiopia",
			"Columbia",
			"Mexico",
			"Java"
		];
		
		// $scope.files = {};

		$scope.getSignedRequest = function(file){
			// console.log('trigger function in add roast controller');
			// console.log(file);
			
			$http({
				method: 'get',
				url: '/sign_s3?file_name=' +file.name+ '&file_type=' +file.type
			})
			.then(function (response) {
				if (response.status === 200) {
					// console.log("response status is 200");
					// console.log("response.signed_request is " + response.data.signed_request);
					// console.log("response.url is " + response.data.url)
					// console.log(response)
					$scope.uploadFile(file, response.data.signed_request, response.data.url);
				}
				else {
					console.log("Could not get signed URL.");
				}
				// var response = JSON.parse(xhr.responseText);
				// console.log(response.signed_request, response.url)
        // upload_file(file, response.signed_request, response.url);
			}, function (response) {
				console.log('error uploading');
			});
		}

		$scope.uploadFile = function(file, signed_request, url){

			console.log(file);
			console.log(signed_request);
			console.log(url);
			
			$http({
				method: 'put',
				url: signed_request,
				headers: {
				// 'x-amz-acl': 'public-read'
					'x-amz-acl': 'public-read',
					'Content-Type': 'multipart/form-data'
				},
				data: file
			})
			// $http({
			// 	method: 'put',
			// 	url: url,
			// 	headers: {
			// 		// 'x-amz-acl': 'public-read'
			// 		'x-amz-acl': 'public-read'
			// 	},
			// 	data: file
		 //    // !!!! xhr.setRequestHeader('x-amz-acl', 'public-read');
			// })
			// $http.put(signed_request, file)
			.then(function (response) {
				if (response.status === 200) {
					console.log("success uploading, check aws");
					console.log(url);
					// document.getElementById("preview").src = url;
		   //    document.getElementById("avatar_url").value = url;
				}
				else {
					console.log("failure uploading")
				}
			});
		    
		}

		// function upload_file(file, signed_request, url){
		//     var xhr = new XMLHttpRequest();
		//     xhr.open("PUT", signed_request);
		//     xhr.setRequestHeader('x-amz-acl', 'public-read');
		//     xhr.onload = function() {
		//         if (xhr.status === 200) {
		//             document.getElementById("preview").src = url;
		//             document.getElementById("avatar_url").value = url;
		//         }
		//     };
		//     xhr.onerror = function() {
		//         alert("Could not upload file.");
		//     };
		//     xhr.send(file);
		// }


		// add a roast
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

		//listener for fileupload - defunct
		// $scope.filesChanged = function (elm) {
		// 	$scope.files=elm.files;
		// 	//console.log(self.files);
		// 	$scope.$apply();
		// };
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



