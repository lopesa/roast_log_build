angular.module('roastLogApp', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial', 'CRUDservice', 'RoastLogAppCtrl', 'RoastLogAppDirs', 'd3'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/show_roasts.html'
		})
		.when('/add_roast', {
			templateUrl: 'views/add_roast.html'
		})
		.when('/single_roast/:id', {
			templateUrl: 'views/single_roast.html'
		})
		.otherwise({redirectTo: '/'});

		// $locationProvider.html5Mode(true);

	}]);