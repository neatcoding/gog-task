var gogControllers = angular.module('gogControllers', []);

/*-----------------------------------------
    home page controller
-----------------------------------------*/

gogControllers.controller('homePageCtrl', ['$scope', function ($scope) {}]);

gogControllers.controller('gameBoxCtrl', ['$scope', 'Games', function ($scope, Games) {
    // get data from Games service
    $scope.games = Games.getGames();

    // if we would re-use this somewhere, we should store it in a service
    $scope.chosenPrice = Games.getDefaultPrice();
    // this function defines if checkout should be visible
    setCheckoutEnabled(true);

    // introduce game availability state property
    updateGamesAvailability();

    // minimum and maximum values
    $scope.minimumSliderValue = $scope.games[0].price;
    $scope.maximumSliderValue = 49.99;

    // calculate game percent of slider values
    $scope.games.forEach(function(game){
        game.percentOfWhole = (game.price - $scope.minimumSliderValue)/($scope.maximumSliderValue-$scope.minimumSliderValue)*100;
    });

    // check if game prices are close
    // (could be done also with hit test)
    $scope.gameTresholdsClose = ($scope.games[2].price - $scope.games[1].price) < 5.5;

    // function that updates price (with click for example)
    $scope.setPrice = function(_price) {
        $scope.chosenPrice = _price;
    };

    // update what to show in max slider value
    updateMaxValue();

    // pattern checking if money input is valid
    $scope.moneyPattern = (function() {
        var regexp = /^\d{0,}(\.\d{0,2}){0,1}$/;
        return {
            test: function(value) {
                var testResult = regexp.test(value);
                setCheckoutEnabled(testResult);
                return testResult;
            }
        };
    })();

    // check what to show on slider right side
    $scope.$watch('chosenPrice', function() {
        updateMaxValue();
        updateGamesAvailability();
    });


    // function sets checkout enabled or disabled
    function setCheckoutEnabled(_isEnabled) {
        $scope.checkoutHref = _isEnabled ? '#/checkout' : '#/';
        $scope.checkoutEnabled = _isEnabled;
    }

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


gogControllers.controller('gamesSoldCtrl', ['$scope', 'Games', function ($scope, Games) {
    // get data from Games service
    $scope.gamesSold = Games.getGamesSold();
    $scope.trailerAvailable = false;
    $scope.gamesSoldRequiredForTrailer = Games.getGamesSoldRequiredForTrailer();

    // animate gamesSold $scope object property imitating real time updates
    TweenLite.to($scope, 60, {
        gamesSold: '+=20000',
        roundProps: 'gamesSold', // games are whole numbers, not floats
        ease: Power1.easeInOut,
        // digest scope every frame of animation to react on gamesSold change
        onUpdate: function(){ $scope.$digest(); }
    });

    // watch games sold change
    $scope.$watch('gamesSold', function(){
        // process gamesSold to digits to show them
        $scope.gamesSoldDigits = numberWithDots($scope.gamesSold);

        // check if trailer is available
        if($scope.gamesSold > $scope.gamesSoldRequiredForTrailer) {
            $scope.trailerAvailable = true;
        } else {
            $scope.trailerAvailable = false;
        }
    });

    // helper to format number in thousands separated with dots style
    function numberWithDots(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1.$2");
        return x;
    }
}]);