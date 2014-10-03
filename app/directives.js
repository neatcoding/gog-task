var gogDirectives = angular.module('gogDirectives', []);

/*-----------------------------------------
    Directive created to use Draggable
    and have customized slider just
    as I want it to be. :)
-----------------------------------------*/

gogDirectives.directive('gogPriceSlider', [function() {
    return {
        restrict: "E",
        scope: {
            /* synchronizing slider values with other scope */
            sliderValue: "=",
            sliderMin: '=',
            sliderMax: '='
        },
        link: function(scope, slider, attr) {
            /*-----------------------------------------
                Variable declarations
            -----------------------------------------*/

            // get start value from attribute (could get it from scope of course)
            var currentPercent = convertValueToPercent(scope.sliderValue);

            // using jqLite and assuming only image is track handle,
            // could use jQuery or id
            var handle = slider.find('img');
            var maximumX = slider.prop('clientWidth');
            var isDragging = false;

            var draggable;


            /*-----------------------------------------
                Main
            -----------------------------------------*/

            /* init draggable element (bind drag) */
            draggable = Draggable.create(handle, {
                type: 'x', // only x-axis
                bounds: {minX: 0, maxX: maximumX},
                zIndexBoost: false, // because it is not needed
                // know if it's currently dragging
                onDragStart: function(){ isDragging = true; },
                onDragEnd: function(){ isDragging = false; },
                onDrag: function(e) {
                    handleXChange(this.x);
                }
            });

            /* bind mousedown */
            slider.on('mousedown', function(e){
                // don't react on handle image
                if(e.target.nodeName.toLowerCase() === 'img') { return; }

                var clickXOffset = e.layerX;

                // set handle position according to current percent
                TweenLite.set(handle, {x: clickXOffset});
                // update draggable instance knowledge
                draggable[0].update();
                // start dragging immediately
                draggable[0].startDrag(e);
                // update at start as
                handleXChange(clickXOffset);
            });

            /* watch for outside slider value changes */
            scope.$watch('sliderValue', function(){
                // if it is dragging currently, don't react
                if(isDragging) {
                    return;
                // if not, update slider values
                } else {
                    currentPercent = convertValueToPercent( scope.sliderValue );

                    // hold percent bounds
                    if(currentPercent > 100) {
                        currentPercent = 100;
                    } else if(currentPercent < 0) {
                        currentPercent = 0;
                    }

                    // set handle position according to current percent
                    TweenLite.set(handle, { x: convertPercentToX( currentPercent ) });
                    // update draggable instance knowledge
                    draggable[0].update();
                    // update all other positions
                    updateAdditionalPositions();
                }
            });


            /*-----------------------------------------
                Methods
            -----------------------------------------*/

            /* handles changes from slider */
            function handleXChange(x) {
                currentPercent = convertXToPercent(x);

                updateAdditionalPositions();
                updateScopeValues();
            }

            /* update position of track fill and input box */
            function updateAdditionalPositions() {
                TweenLite.set('#slider-track-fill', {width: currentPercent+'%'});
                // percent in range 20-80
                var relativePercent = currentPercent*0.6 + 20;
                TweenLite.set('#price-box', {left: currentPercent+'%', xPercent: -relativePercent});
                TweenLite.set('#price-arrow', {left: relativePercent+'%'});
            }

            /* updates scope values according to percent */
            function updateScopeValues() {
                scope.sliderValue = convertPercentToValue( currentPercent );
                scope.$apply();
            }


            /*-----------------------------------------
                Converting helpers
            -----------------------------------------*/

            /* function converting x value to percent */
            function convertXToPercent(x) {
                return x/maximumX*100;
            }
            /* function converting percent to x value */
            function convertPercentToX(percent) {
                return percent*maximumX/100;
            }
            /* function converting value to percent */
            function convertValueToPercent(value) {
                return ((value - scope.sliderMin) / (scope.sliderMax - scope.sliderMin)) * 100;
            }
            /* function converting value to percent */
            function convertPercentToValue(percent) {
                var value = percent * (scope.sliderMax - scope.sliderMin) + scope.sliderMin * 100;
                value = Math.round(value);
                value /= 100; // two decimal places this way
                return value;
            }
        }
    };
}]);
