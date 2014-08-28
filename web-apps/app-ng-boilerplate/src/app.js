angular.module( 'ngBoilerplate', [
  'templates-app',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router',
  'restangular'
])

.config( function myAppConfig ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise( '/home' );

})

.run( function run ($window, Restangular, SecuredBoilerplateAPI, SecuredBoilerplateAPIConfig) {
  SecuredBoilerplateAPIConfig.setInterceptors($window, SecuredBoilerplateAPI);

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http, $window, PublicBoilerplateAPI, SecuredBoilerplateAPIConfig ) {
// this is the wrong place to authenticate, but
// useful as a start to test
  SecuredBoilerplateAPIConfig.authenticate($window, PublicBoilerplateAPI, {username: 'john.doe', password: 'foobar'});

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;
