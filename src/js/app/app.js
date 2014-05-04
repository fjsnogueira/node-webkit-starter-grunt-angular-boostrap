(function (angular, appCfg) {
    'use strict';
    var app = angular.module('app', [
        'ui.bootstrap',
        'ui.router',
        'app.Controllers',
        'app.Filters',
        'app.Services',
        'app.Directives',
        'app.Routes'
    ]).constant('appCfg', appCfg);
}(angular, appCfg));