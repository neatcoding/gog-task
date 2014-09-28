var gogControllers = angular.module('gogControllers', []);

/*-----------------------------------------
    home page controller, there's only one
    because it is small
-----------------------------------------*/

gogControllers.controller('homePageCtrl', ['$scope', 'Games', function ($scope, Games) {
    // get data from Games service
    $scope.games = Games.getGames();
    $scope.gamesSold = Games.getGamesSold();
    // introduce game availability state property
    $scope.games.forEach(function(game){ game.available = true; });

    $scope.maximumSliderValue = 49.99;
}]);


