gogApp.service('Games', ['$http', function ($http) {
    var myData = null;
    var defaultPrice;

    var promiseGames = $http.get('app/data/gamesData.json').success(function (data) {
        myData = data;
        // default chosen price is last game price
        defaultPrice = myData.games[myData.games.length-1].price;
    });

    // get data from json file
    var promise = promiseGames.then(function () {
        return $http.get('app/data/gamesData.json').success(function (data) {
            // Read and process another file
        });
    });


    return {
        promise: promise,
        getGames: function() {
            return myData.games;
        },
        getDefaultPrice: function() {
            return defaultPrice;
        },
        getGamesSold: function() {
            return myData.gamesSold;
        }
    };
}]);
