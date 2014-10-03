/* App Module */
var gogApp = angular.module('gogApp', [
        'ngRoute',
        'ngResource',
        'gogControllers',
        'gogDirectives',
        'gogFilters',
        'gogServices',
        'timer',
        'angular-progress-arc'
    ]).run(function () {
});


/*-----------------------------------------
    Routing configuration
-----------------------------------------*/
gogApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            // controller: 'homePageCtrl', // not used
            resolve: {
                games: ['Games', function(Games) {
                    return Games.promise;
                }]
            }
        })
        // .when('checkout', {})
        .otherwise({
            redirectTo: '/'
        });
}]);