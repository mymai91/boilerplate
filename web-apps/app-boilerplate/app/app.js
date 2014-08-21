(function(){

'use strict';
angular.module('app-boilerplate', [ 'ngRoute','app-boilerplate-main','templates'])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });

})();