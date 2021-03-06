angular.module( 'ngBoilerplate.about', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, PublicBoilerplateAPI ) {
  // This is simple a demo for UI Boostrap.
  PublicBoilerplateAPI.one("awesome",2).get().then(function(awesome) {
	$scope.awesome=awesome;
  });
})

;
