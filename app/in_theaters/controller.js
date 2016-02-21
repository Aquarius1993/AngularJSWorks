(function(angular) {
	'use strict';
	var module = angular.module('moviecat.in_theaters', ['ngRoute','moviecat.services.http']);
	module.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/:category/:page',{
        	templateUrl:'in_theaters/view.html',
        	controller:'InTheatersController'
		});
	}]);
	module.controller('InTheatersController', [
		'$scope',
    '$route',
    '$routeParams',
    'HttpService',
    '$location',
    'AppConfig',
    function($scope, $route, $routeParams, HttpService,$location,AppConfig) {
      var count = AppConfig.pageSize; // 每一页的条数
      var page = parseInt($routeParams.page); // 当前第几页
      var start = (page - 1) * count; // 当前页从哪开始
      // 控制器 分为两步： 1. 设计暴露数据，2. 设计暴露的行为
      $scope.loading = true; // 开始加载
      $scope.subjects = [];
      $scope.title = 'loading...';
      $scope.message = '';
      $scope.totalCount = 0;
      $scope.totalPages = 0;
      $scope.currentPage = page;
      HttpService.jsonp(
        AppConfig.listApiAddress + $routeParams.category, { start: start, count: count,q:$routeParams.q },
        function(data) {
          $scope.title = data.title;
          $scope.subjects = data.subjects;
          $scope.totalCount = data.total;
          $scope.totalPages = Math.ceil($scope.totalCount / count);
          console.log($scope.totalPages);
          $scope.loading = false;
          $scope.$apply();
          // $apply的作用就是让指定的表达式重新同步
        });

      // 暴露一个上一页下一页的行为
      $scope.go = function(page) {
        // 传过来的是第几页我就跳第几页
        // 一定要做一个合法范围校验
        if (page >= 1 && page <= $scope.totalPages)
          $route.updateParams({ page: page });
      };

      
      $scope.$location = $location;
      $scope.coa = '/in_theaters';
      //console.log($scope.$location)
      //监听
      $scope.$watch('$location.path()',function(now){
      	//console.log(now)
      	if(now.startsWith('/in_theaters')) {
      		$scope.coa = '/in_theaters';
      	}else if(now.startsWith('/coming_soon')) {
      		$scope.coa = '/coming_soon';
      	}else if(now.startsWith('/top250')) {
      		$scope.coa = '/top250';
      	}
      	//console.log($scope.coa)
      });


    }]);
})(angular);