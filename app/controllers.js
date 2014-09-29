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

    // slider takes value of the last game
    $scope.chosenPrice = $scope.games[$scope.games.length-1].price;

    // introduce game availability state property
    updateGamesAvailability();

    // minimum and maximum values
    $scope.minimumSliderValue = $scope.games[0].price;
    $scope.maximumSliderValue = 49.99;

    // calculate game percent of slider values
    $scope.games.forEach(function(game){
        console.log('range', ($scope.maximumSliderValue-$scope.minimumSliderValue));
        game.percentOfWhole = (game.price - $scope.minimumSliderValue)/($scope.maximumSliderValue-$scope.minimumSliderValue)*100;
    });

    // function that updates price (with click for example)
    $scope.setPrice = function(_price) {
        $scope.chosenPrice = _price;
    };

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
    $scope.$watch('chosenPrice', function(){
        updateMaxValue();
        updateGamesAvailability();
    });

    /* updates maximum visible slider value; */
    function updateMaxValue() {
        // if chosen value is greater than maximum on slider, show chosen value on the right
        $scope.visibleMaximumSliderValue = (angular.isDefined($scope.chosenPrice) && $scope.maximumSliderValue < $scope.chosenPrice) ? $scope.chosenPrice : $scope.maximumSliderValue;
    }

    /* updates game availability states */
    function updateGamesAvailability() {
        $scope.games.forEach(function(game){
            if(angular.isDefined($scope.chosenPrice) && game.price <= $scope.chosenPrice) {
                game.available = true;
            } else {
                game.available = false;
            }
        });
    }
}]);