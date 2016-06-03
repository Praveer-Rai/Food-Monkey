angular.module('authInterceptor', [])
.factory('authInterceptorFactory', function($q, $location, $window){

    var interceptorFactory = {};

    interceptorFactory.request = function(config){
        var token = $window.localStorage.getItem('token');

        if(token){
            config.headers.Authorization = 'JWT' + token;
        }

        return config;
    };

    interceptorFactory.response = function(response){
        if(response.status == 403) //forbidden
            $location.path('/login'); //redirect to login if u don't have a token

        return $q.reject(response);
    };

    return interceptorFactory;
});