gogApp.service('Games', ['$http', function ($http) {
    var myData = null;

    var promiseGames = $http.get('app/data/gamesData.json').success(function (data) {
        myData = data;
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
        getGamesSold: function() {
            return myData.gamesSold;
        }
    };
}]);
