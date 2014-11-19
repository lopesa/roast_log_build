angular.module('CRUDservice', []).factory('CRUD', ['$http', function($http) {

	return {
		// call to list all roasts
		list : function() {
			return $http.get('/api/roasts');
		},

		// call to POST and create a new roast
		addRoast : function(roastData) {
			return $http.post('/api/roasts', roastData);
		},

		// call to DELETE a roast
		deleteRoast : function(id) {
			return $http.delete('/api/roasts/' + id);
		},

		//upload a photo
		uploadImage : function() {
			return $http.put('/api/roasts')
		}
	}
	
}]);