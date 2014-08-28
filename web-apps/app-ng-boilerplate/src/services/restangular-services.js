'use strict';

// for a real app, use https:// for all base URLs
var boilerplateBase='http://localhost:3000';

angular.module('ngBoilerplate')
  .factory('PublicBoilerplateAPI', function PublicBoilerplateAPI(Restangular) {

     return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(boilerplateBase+'/');
     });
  })

  .factory('SecuredBoilerplateAPI', function SecuredBoilerplateAPI(Restangular) {

    return Restangular.withConfig(function(RestangularConfigurer) {
       RestangularConfigurer.setBaseUrl(boilerplateBase+'/secured/api/');
    });
  })

.factory('SecuredBoilerplateAPIConfig', function SecuredBoilerplateAPIConfig() {

  return  {
     setInterceptors: function($window, api) {
      api.addFullRequestInterceptor(function(element, operation, what, url, headers, params, element, httpConfig){
        headers = headers || {};
        if ($window.sessionStorage.boilerplateToken) {
          headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
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

    authenticate: function($window, publicAPI, authInfo) {
      publicAPI.all('authenticate').post(authInfo)
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
