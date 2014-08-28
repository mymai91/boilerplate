/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $window, PublicBoilerplateAPI, SecuredBoilerplateAPI, SecuredBoilerplateAPIConfig ) {
  // this is another example of something you really wouldn't do
  //   ... first off, the data should be fetched in a resolve.
  //     And you normally don't switch to a public api if the secured one is not ready
  // We need to do this, because the auth may not be done yet
  // This race condition is not likely something that will
  // happen in a prod app because you won't being doing
  // the auth in the insane place we are doing it now (on app bootup)
  if (SecuredBoilerplateAPIConfig.isAuthenticated($window)) {
    SecuredBoilerplateAPI.one("awesome",1).get().then(function(awesome) {
      $scope.awesome=awesome;
    });
  } else {
    PublicBoilerplateAPI.one("awesome",1).get().then(function(awesome) {
      $scope.awesome=awesome;
    });
  }
})

;
