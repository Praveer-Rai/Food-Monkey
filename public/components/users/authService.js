angular.module('authService', [])

.factory('Auth', function($window, $http){

    this.getToken = function(){
        return $window.localStorage.getItem('token');
    };

    this.setToken = function(jwt){
        $window.localStorage.setItem('token', jwt);
    };

    this.removeToken = function(){
        $window.localStorage.removeItem('token');
    };

    this.isLoggedIn = function(){
        if (this.getToken()) return true;
        else return false;
    };

    this.login = function(username, password){
        $http.post('/signup', {username: username, password: password});
    };

    this.logout = function(){
        this.removeToken();
    };
});