gogApp.service('Books', ['$http', function ($http) {
    var myData = null;

    var promiseBooks = $http.get('app/data/books.json').success(function (data) {
        myData = data;
        console.log(myData);
    });

    // get data from json file
    var promise = promiseBooks.then(function () {
        return $http.get('app/data/books.json').success(function (data) {
            // Read and process another file
        });
    });

    return {
        promise: promise,
        getAll: function () {
            return myData;
        }
    };
}]);


// gogApp.factory('Books', ['$resource', function($resource) {
//     return $resource('app/data/books.json', {}, {});
// }]);