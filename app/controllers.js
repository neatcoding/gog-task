var gogControllers = angular.module('gogControllers', []);

/*-----------------------------------------
    home page controller
-----------------------------------------*/

gogControllers.controller('homePageCtrl', ['$scope', 'Games', function ($scope, Games) {
    // get data from Games service
    $scope.gamesSold = Games.getGamesSold();
}]);


gogControllers.controller('gameBoxCtrl', ['$scope', 'Games', function ($scope, Games) {
    // get data from Games service
    $scope.games = Games.getGames();

    // introduce game availability state property
    $scope.games.forEach(function(game){ game.available = true; });

    // slider takes value of the last game
    $scope.chosenPrice = $scope.games[$scope.games.length-1].price;

    // minimum and maximum values
    $scope.minimumSliderValue = $scope.games[0].price;
    $scope.maximumSliderValue = 49.99;

    updateMaxValue();

    // pattern checking if money input is valid
    $scope.moneyPattern = (function() {
        var regexp = /^\d{0,}(\.\d{0,2}){0,1}$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();

    // check what to show on slider right side
    $scope.$watch('chosenPrice', updateMaxValue);

    /* updates maximum visible slider value; */
    function updateMaxValue() {
        // if chosen value is greater than maximum on slider, show chosen value on the right
        $scope.visibleMaximumSliderValue = (angular.isDefined($scope.chosenPrice) && $scope.maximumSliderValue < $scope.chosenPrice) ? $scope.chosenPrice : $scope.maximumSliderValue;
    }
}]);