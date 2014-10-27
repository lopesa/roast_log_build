angular.module('RoastLogAppCtrl', [])
	.controller('roastLogAppCtrl', ['CRUD', function (CRUD) {

		var self = this;
		self.roasts = [];
		self.newRoast = {};
		
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


		self.deleteRoast = function(id) {

			
			CRUD.deleteRoast(id)
				.then(fetchRoasts)
				.then(function(response){
					console.log(response);
				});
		};
}]);