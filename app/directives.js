
var gogDirectives = angular.module('gogDirectives', []);

/*-----------------------------------------
    Directive created to use GreenSock
    and have customized slider just
    as I want it to be. :)
-----------------------------------------*/

gogDirectives.directive('gogPriceSlider', ['$document', function($document) {
  return function(scope, element, attr) {
    var startX = scope.price, startY = 0, x = 0, y = 0;

    console.log('attr', attr.gogPriceSlider);

    element.css({
     position: 'relative',
     border: '1px solid red',
     backgroundColor: 'lightgrey',
     cursor: 'pointer'
    });

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.pageX - scope.price;
      startY = event.pageY - y;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      y = event.pageY - startY;
      x = event.pageX - startX;

      scope.price = x;
      scope.$apply();

      element.css({
        top: y + 'px'
      });
    }

    scope.$watch('price', function(){
      console.log('scope.price change', scope.price)
      element.css({
        left: scope.price + 'px'
      });
    });

    function updatePosition() {
      element.css({left: scope.price});
    }

    function mouseup() {
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);
    }
  };
}]);