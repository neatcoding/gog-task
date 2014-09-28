var gogControllers = angular.module('gogControllers', []);

gogControllers.controller('homePageCtrl', ['$scope', 'Books', function ($scope, Books) {
    $scope.books = Books.getAll();
    // $scope.books = Books.query();

    console.log($scope.books);
}]);





/*-----------------------------------------
    Controller with directive :)
-----------------------------------------*/

// angular.module('dragModule', [])
// .controller('testCtrl', ['$scope', function($scope){
// console.log('controller!');
// $scope.price = 200;
// }])
// .directive('myDraggable', ['$document', function($document) {
//   return function(scope, element, attr) {
//     var startX = 0, startY = 0, x = 0, y = 0;

//     console.log('attr', attr.myDraggable);

//     element.css({
//      position: 'relative',
//      border: '1px solid red',
//      backgroundColor: 'lightgrey',
//      cursor: 'pointer'
//     });

//     element.on('mousedown', function(event) {
//       // Prevent default dragging of selected content
//       event.preventDefault();
//       startX = event.pageX - x;
//       startY = event.pageY - y;
//       $document.on('mousemove', mousemove);
//       $document.on('mouseup', mouseup);
//     });

//     function mousemove(event) {
//       y = event.pageY - startY;
//       x = event.pageX - startX;

//       scope.price = x;
//       scope.$apply();

//       element.css({
//         top: y + 'px'
//       });
//     }

//     scope.$watch('price', function(){
//       console.log('element css');
//       element.css({
//         left: scope.price + 'px'
//       });
//     });

//     function updatePosition() {
//       element.css({left: scope.price});
//     }

//     function mouseup() {
//       $document.off('mousemove', mousemove);
//       $document.off('mouseup', mouseup);
//     }
//   };
// }]);


// <body ng-app="dragModule">
// <div ng-controller="testCtrl">
//     <span my-draggable>Drag M{{price}}E</span>
// {{price}}
// <input type="number" ng-model="price">
// </div>


// </body>