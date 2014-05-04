(function (angular) {
    'use strict';

    var appFilters = angular.module('app.Filters', []);

    appFilters.filter('range', function () {
        return function (input, total) {
            total = parseInt(total, 10);
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    });

    appFilters.filter('isempty', function () {
        return function (input) {
            var size = 0, key;
            for (key in input) {
                if (input.hasOwnProperty(key)) {
                    size++;
                }
            }
            if (size > 0) {
                return true;
            }
            return false;
        };
    });
}(angular));