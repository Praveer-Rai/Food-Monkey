angular.module('authInterceptor', [])

.factory('authInterceptorFactory', function(Auth, $location){
    this.request = function(config){
        if (Auth.isLoggedIn()){
            var token = Auth.getToken();
            config.headers.Authorization = 'JWT' + token;
        }

        return config;
    };

    this.response = function(response){
        if(response.status == 403) //forbidden
            $location.path('/login'); //redirect to login if u don't have a token

    };

    return this;
});