'use strict';

angular.module('roastLogApp', [])

	.controller('RoastLogAppCtrl', function ($scope, $http) {

		//$scope.formData = {};

		//GET ALL ROASTS
		$http.get('/api/roasts').success(function(data){
			$scope.roasts = data;
		});
	  
		//CREATE NEW ROAST AND RETURN ALL ROASTS
		$scope.addRoast = function() {

			console.log('got here in controllers');

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formdata != undefined) {

				console.log($scope.formdata);
				console.log('got here in controllers further down');

				var formdata = $scope.formdata;

				$http.post('/api/roasts', formdata)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						console.log(formdata);
						//console.log($scope.formdata);
						$scope.formdata = {}; // clear the form so our user is ready to enter another
						$scope.roasts = data; // assign our new list of todos
					});
			}
			
			//else console.log('i guess the formdata is undefined!');
		};

		//DELETE A ROAST
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

