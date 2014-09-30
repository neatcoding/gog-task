var gogControllers = angular.module('gogControllers', []);

/*-----------------------------------------
    home page controller
-----------------------------------------*/

gogControllers.controller('homePageCtrl', ['$scope', function ($scope) {}]);

gogControllers.controller('gameBoxCtrl', ['$scope', 'Games', function ($scope, Games) {
    // get data from Games service
    $scope.games = Games.getGames();

    // if we would re-use this somewhere, we should store it in service
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
    processGamesSoldToDigits();

    // animate gamesSold $scope object property imitating real time updates
    TweenLite.to($scope, 80, {
        gamesSold: '+=20000',
        roundProps: 'gamesSold', // games are whole numbers, not floats
        ease: Power1.easeInOut,
        onUpdate: processGamesSoldToDigits
    });

    // could do this with $watch, but it's inefficient
    function processGamesSoldToDigits() {
        // build digits to show
        $scope.gamesSoldDigits = numberWithDots($scope.gamesSold);

        // prevent apply during digest
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    }

    // format number in thousands separated with dots style
    function numberWithDots(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1.$2");
        return x;
    }
}]);