(function(angular){
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('myApp', [
	  'ngRoute',
	  'moviecat.movie_detail',
	  'moviecat.in_theaters',
	  
	  'moviecat.directives.auto_focus'
	])
	// 为模版定义一些常量
	.constant('AppConfig', {
		pageSize:5,
		listApiAddress: 'http://api.douban.com/v2/movie/',
   		detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
	})
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}])
	.controller('SearchController', [
		'$scope',
		'$route',
		'AppConfig', 
		function($scope,$route,AppConfig){
			$scope.input = '';
			$scope.search = function(){
				$route.updateParams({
					category:'search',
					q:$scope.input
				});
			}		
	}]);
})(angular);
