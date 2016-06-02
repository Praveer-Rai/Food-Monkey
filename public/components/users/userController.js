angular.module('userCTRL', [])

.controller('UserController', function($scope, $window, $location, User){

    $scope.signupUser = function(){
        User.signup($scope.username, $scope.password)
            .then(function(res){
                $scope.username = '';
                $scope.password = '';
                $scope.message = res.data.message;

                $window.localStorage.setItem('token', res.data.token); //sets token after successful signup
                $location.path('/'); //goes back to home after signup
            })
    }
});