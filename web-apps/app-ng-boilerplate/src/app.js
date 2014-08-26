angular.module( 'ngBoilerplate', [
  'templates-app',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router',
  'restangular'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, RestangularProvider) {
  $urlRouterProvider.otherwise( '/home' );
  RestangularProvider.setBaseUrl('@@apiServer');
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;
