
(function (angular, appCfg) {
    'use strict';

    var appController = angular.module('app.Controllers', ['ngSanitize', 'ngAnimate']);

    appController.controller('MainCtrl',
        ['$scope', 'appCfg',
            function ($scope, appCfg) {
                $scope.data = {
                    os:{
                        'test':'test'
                    }
                };
                console.log('test');
                $scope.appCfg = appCfg;
            }
        ]
    );

})(angular, appCfg);