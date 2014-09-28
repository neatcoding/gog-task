/* App Module */
var gogApp = angular.module('gogApp', [
        'ngRoute',
        'gogControllers',
        'gogDirectives',
        'ngResource'
    ]).run(function () {
});


/*
 Routing configuration
 */
gogApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'homePageCtrl',
            resolve: {
                games: ['Games', function(Games) {
                    return Games.promise;
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);