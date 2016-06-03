// Declare app level module which depends on views, and components
angular.module('mainApp', ['ui.router', 'userCTRL', 'authCTRL', 'userService', 'authService', 'authInterceptor'])

    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/home.html',
                controller: 'AuthController',
                controllerAs: 'auth'
            })
            .state('login',{
                url: '/login',
                templateUrl: './views/login.html',
                controller: 'AuthController',
                controllerAs: 'auth'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: './views/signup.html',
                controller: 'UserController',
                controllerAs: 'user'
            });

        /*
        $mdIconProvider
            .iconSet('content', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
            .iconSet('action', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
            .iconSet('editor', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg')
            .iconSet('navigation', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg');
        */

        //this overrides the defaults action for all $resources
        /*
        angular.extend($resourceProvider.defaults.actions, {

            update: {
                method: "PUT"
            }

        });
        */


        //$httpProvider.interceptors.push('reqErrInterceptor');
        //auth interceptor
        $httpProvider.interceptors.push('authInterceptorFactory');

        /*
         $breadcrumbProvider.setOptions({
         templateUrl:"components/breadcrumbs/breadcrumbs.html",
         });
         */
        $locationProvider.html5Mode(true);
    });