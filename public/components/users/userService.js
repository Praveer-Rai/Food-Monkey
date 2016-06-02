angular.module('userService', [])

.factory('User', function($http){

    this.signup = function(username, password){
        $http.post('/signup', {username: username, password: password});
    };

    this.login = function(username, password){
        $http.post('/login', {username: username, password: password});
    };

});