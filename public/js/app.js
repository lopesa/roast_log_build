angular.module('roastLogApp', ['angularFileUpload', 'ui.date', 'ngRoute', 'ngAnimate', 'CRUDservice', 'RoastLogAppCtrl', 'RoastLogAppDirs'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/show_roasts.html'
		})
		.when('/add_roast', {
			templateUrl: 'views/add_roast.html'
		})
		.when('/single_roast', {
			templateUrl: 'views/single_roast.html'
		})
		.otherwise({redirectTo: '/'});
	}]);