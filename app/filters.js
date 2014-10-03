/*-----------------------------------------
    My filter that is replacing commas
    with dots as thousands separator
-----------------------------------------*/

gogApp.filter('numberDotted',
    [ '$filter', function(filter) {
        var numberFilter = filter('number');
        return function(amount, fractionSize) {
            var numberDotted = numberFilter(amount, fractionSize);
            numberDotted = numberDotted.split('.').join('__FRACTION__');
            numberDotted = numberDotted.split(',').join('.');
            numberDotted = numberDotted.split('__FRACTION__').join(',');
            return numberDotted;
        };
    }
]);