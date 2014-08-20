(function(){
	'use strict';

	angular.module('boilerplate', [ 'ngRoute','boilerplate-main','templates' ])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
	  
})();