angular.module('authCTRL', [])

.controller('AuthController', function($scope, $location, Auth){

    $scope
        .isLoggedIn = function(){
            return Auth.isLoggedIn();
        }
        .login = function(){

            Auth.login($scope.loginData.username, $scope.loginData.password)
                .success($location.path('/'));
        }
        .logout = function(){
            Auth.logout().success($location.path('/'));
        }
})