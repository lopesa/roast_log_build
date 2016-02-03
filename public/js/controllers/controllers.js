angular.module('RoastLogAppCtrl', [])
	.controller('roastLogAppCtrl', ['CRUD', '$scope', '$location', function (CRUD, $scope, $location) {

		$scope.roasts = [];
		$scope.singleRoast = {};

		
		$scope.dateTransform = function(date) {
			// utility function
			// all to resurrect this thing as an object (from a string)
			// code smell = doodie
			
			// changes string intake 'date' into number of milliseconds
			// since 1970 whatever
			var dateParse = Date.parse(date)

			// create new date object
			// set it's value based on that millisecond value from above 
			var newTime = new Date();
			newTime.setTime(dateParse);

			return newTime.toDateString();
		}

		//this is the main get roasts function that's invoked
		// in the other functions that follow
		
		// return all roasts
		var fetchRoasts = function() {
			CRUD.list().then(function(response) {
				$scope.roasts = response.data;
				// console.log('fetched roasts');
			}, function(errResponse) {
				console.log(errResponse);
			});
		};

		$scope.$on('roastAdded', function(){
			fetchRoasts();
		});



		$scope.deleteRoast = function(id) {

			CRUD.deleteRoast(id)
				.then(fetchRoasts)
				.then(function(response){
					console.log(response);
				});
		};

		// get all roasts when the controller loads
		fetchRoasts();
	}])
	// =================================
	// view one roast controller
	//==================================
	.controller('viewOneRoastCtrl', ['CRUD', '$scope', '$http', '$location', '$routeParams', function (CRUD, $scope, $http, $location, $routeParams) {

		$scope.fetchOneRoast = function(id) {

			CRUD.getRoast(id)
				.then(function(response){
					$scope.singleRoast = response.data;
					// console.log($scope.singleRoast.temp_per_minute);
				});
		};

		$scope.fetchOneRoast($routeParams.id);
	}])
	// =================================
	// add roast controller
	//==================================
	.controller('addRoastCtrl', ['CRUD', '$scope', '$http', '$location', function (CRUD, $scope, $http, $location) {
			
		$scope.newRoast = {
			//////////////////////////////////////
			//
			// only need these two live for defaults
			// the rest are to show what the model looks like
			// as coming in from the view
			//
			//////////////////////////////////////
			roaster_warm: false,
			country: "Bean Origin",
			// title
			// roastDate
			// beans_received
			// country
			// bean_processing
			// roaster_program
			// time: {
			// 	bottom: "1:30",
			// 	yellow: "5:00",
			// 	brown: "8:00",
			// 	first_crack_start: "9:00",
			// 	first_crack_end: "10:30",
			// 	second_crack_start: "11:30",
			// 	end: "13:00"
			// },
			// file: {
			// 	name: "",
			//	url: ""
			// }
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
			"Java",
			"Brazil",
			"Costa Rica",
			"India",
			"Guatemala"
		];
		// =================================
		//
		// https://devcenter.heroku.com/articles/s3-upload-node
		// https://egghead.io/lessons/angularjs-file-uploads
		// http://stackoverflow.com/questions/28899005/presigned-aws-s3-put-url-fails-to-upload-from-client-using-jquery
		// "the key was ensuring that the headers for Content-Type matched exactly"
		//
		// =================================

		$scope.getSignedRequest = function(file){
			$http({
				method: 'get',
				url: '/sign_s3?file_name=' +file.name+ '&file_type=' +file.type
			})
			.then(function (response) {
				if (response.status === 200) {
					$scope.uploadFile(file, response.data.signed_request, response.data.url);
				}
				else {
					console.log("Could not get signed URL.");
				}
			}, function (response) {
				console.log('error uploading');
			});
		}

		$scope.uploadFile = function(file, signed_request, url){
			$http({
				method: 'put',
				url: signed_request,
				headers: {
					'x-amz-acl': 'public-read',
					'Content-Type': 'multipart/form-data'
				},
				data: file
			})
			.then(function (response) {
				if (response.status === 200) {
					url = url.replace(/ /g, '+');
					$scope.newRoast.file.url = url;
					document.getElementById("img-preview").src = url;
				}
				else {
					console.log("failure uploading")
				}
			});
		    
		}
		
		// add a roast
		$scope.addRoast = function() {
			
			//newRoast is connected on the form model in the html
			CRUD.addRoast($scope.newRoast)
			.then($scope.$emit('roastAdded'))
			.then(function(response){
				$scope.newRoast = {}
				$scope.newRoast.roaster_warm = false;
				$scope.newRoast.country = "Bean Origin";
				$location.url("/show_roasts");
			});
		};

	}]);