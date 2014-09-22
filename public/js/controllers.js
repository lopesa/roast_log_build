'use strict';

var roastLogApp = angular.module('roastLogApp', []);

// roastLogApp.controller('CalendarEditCtrl', function ($scope, $http) {
//   $http.get('/api/get', function(req, res){
//   	$scope.shows = res;
//   });
// });

roastLogApp.controller('RoastLogAppCtrl', function ($scope, $http) {

	//$scope.formData = {};

	//GET ALL ROASTS
	$http.get('/api/roasts').success(function(data){
		$scope.roasts = data;
	});
  
	//CREATE NEW ROAST AND RETURN ALL ROASTS
	$scope.addRoast = function() {

		//console.log('got here in controllers');

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formdata != undefined) {

			//console.log($scope.formdata);

			var formdata = $scope.formdata;

			// call the create function from our service (returns a promise object)
			$http.post('/api/roasts', formdata)

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					//console.log(formdata);
					//console.log($scope.formdata);
					$scope.formdata = {}; // clear the form so our user is ready to enter another
					$scope.roasts = data; // assign our new list of todos
				});
		}
		
		//else console.log('i guess the formdata is undefined!');
	};

	//DELETE A SHOW
	$scope.deleteRoast = function(id) {

		//console.log('got here in controllers');

		$http.delete('api/roasts/' + id)
		// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					//$scope.loading = false;
					$scope.roasts = data; // assign our new list of todos
				});

	};
});

