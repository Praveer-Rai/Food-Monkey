angular.module('authService', [])

.factory('Auth', function($window, $http, User){

    this.getToken = function(){
        return $window.localStorage.getItem('jwt');
    };

    this.setToken = function(jwt){
        $window.localStorage.setItem('jwt', jwt);
    };

    this.removeToken = function(){
        $window.localStorage.removeItem('jwt');
    };

    this.isLoggedIn = function(){
        if (this.getToken()) return true;
        else return false;
    };

    this.login = function(username, password){
        User.login(username, password);
    };

    this.logout = function(){
        this.setToken();
    };
});