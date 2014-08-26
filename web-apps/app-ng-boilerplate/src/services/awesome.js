angular.module('ngBoilerplate')
  .factory('AwesomeService', function AwesomeService(Restangular) {
    return {
      getAwesome: function(awesomeId) {
        return Restangular.one("awesome",awesomeId).get();
    }

    };
  });
