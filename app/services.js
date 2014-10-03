var gogServices = angular.module('gogServices', []);

/*-----------------------------------------
    Games service gets data from JSON, promise them
    and provides interface to retrieve them
-----------------------------------------*/

gogServices.service('Games', ['$http', function ($http) {
    var gamesData;

    // get data from json file and promise it
    this.promise = $http.get('app/data/gamesData.json').success(function (data) {
        gamesData = data;
        gamesData.gamesSoldArr = [gamesData.gamesSold];
    });

    // returns games list
    this.getGames = function() {
        return gamesData.games;
    };

    this.getDefaultPrice = function() {
        // default chosen price is last game price
        return gamesData.games[gamesData.games.length-1].price;
    };

    this.getGamesSold = function() {
        return gamesData.gamesSoldArr;
    };

    this.getBonuses = function() {
        return gamesData.bonuses;
    };
}]);
