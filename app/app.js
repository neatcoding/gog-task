/* App Module */
var gogApp = angular.module('gogApp', [
        'ngRoute',
        'gogControllers',
        'ngResource',
        'ngAnimate'
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
                'GamesData': function(Games) {
                    return Games.promise;
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);