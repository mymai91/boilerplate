angular.module( 'ngBoilerplate', [
  'templates-app',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router',
  'restangular'
])

.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider) {
  $urlRouterProvider.otherwise( '/home' );
  RestangularProvider.setBaseUrl('http://localhost:3000/secured/api');
  $httpProvider.interceptors.push('authInterceptor');

})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http, $window ) {
// this is the wrong place for this, but
// useful as a start to test
$http
    .post('http://localhost:3000/authenticate', {username: 'john.doe', password: 'foobar'})
    .success(function (data, status, headers, config) {
      $window.sessionStorage.token = data.token;
    })
    .error(function (data, status, headers, config) {
      // Erase the token if the user fails to log in
      delete $window.sessionStorage.token;
    });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;
