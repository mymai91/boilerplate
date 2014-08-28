'use strict';

var boilerplateBase='@@apiServer';

angular.module('ngBoilerplate')
  .factory('PublicBoilerplateAPI', function PublicBoilerplateAPI(Restangular) {

     return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(boilerplateBase+'/public/api/');
     });
  })

  .factory('SecuredBoilerplateAPI', function SecuredBoilerplateAPI(Restangular) {

    return Restangular.withConfig(function(RestangularConfigurer) {
       RestangularConfigurer.setBaseUrl(boilerplateBase+'/api/');
    });
  })

.factory('SecuredBoilerplateAPIConfig', function SecuredBoilerplateAPIConfig() {

  return  {
     setInterceptors: function($window, api) {
      api.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig){
        headers = headers || {};
        if ($window.sessionStorage.boilerplateToken) {
          headers.Authorization = 'Bearer ' + $window.sessionStorage.boilerplateToken;
        };
        return {
          headers: headers
        };
      });

      api.setErrorInterceptor(function(response, deferred, responseHandler) {
        if(response.status === 401) {
            // handle error
            return false; // error handled
        }

        return true; // error not handled
      });

    },

    authenticate: function($window, api, authInfo) {
      api.all('authenticate').post(authInfo)
        .then(function (data) {
          $window.sessionStorage.boilerplateToken = data.token;
        }, function () {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.boilerplateToken;
        });

    }
  };
})


;
