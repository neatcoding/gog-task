(function(){
    'use strict';

    /* Controllers */

    var gogControllers = angular.module('gogControllers', []);

    gogControllers.controller('homePageCtrl', ['$scope', 'Books', function ($scope, Books) {
        $scope.books = Books.getAll();
        // $scope.books = Books.query();

        console.log($scope.books);
    }]);
})();