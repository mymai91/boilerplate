angular.module( 'ngBoilerplate', [
  'templates-app',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router',
  'restangular'
])

.config( function myAppConfig ($urlRouterProvider) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ($window, SecuredBoilerplateAPI, SecuredBoilerplateAPIConfig, PublicBoilerplateAPI) {
  SecuredBoilerplateAPIConfig.setInterceptors($window, SecuredBoilerplateAPI);

// this is the wrong place to authenticate, but
// useful as a start to test
  SecuredBoilerplateAPIConfig.authenticate($window, PublicBoilerplateAPI, {username: 'john.doe', password: 'foobar'});

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;
