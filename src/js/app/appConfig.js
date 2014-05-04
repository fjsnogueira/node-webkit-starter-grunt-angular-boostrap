'use strict';
var appCfg = {};

(function () {
    var appName = 'nodeWebkitDemo';
    var menus = [
        //{'link':'about','name':'About','ctrl':'aboutCtrl',templateUrl:'partials/about/about.html'}
    ];
    var appVersion = 1;
    var startYear = '2014';

    var now = new Date();
    var currentYear = now.getYear();
    if (currentYear < 1900) {
        currentYear = currentYear + 1900;
    }

    var defaultCacheMin = 5; //minutes

    appCfg = {

        version: appVersion,

        appName: appName,
        menus: menus,
        startYear: startYear,
        currentYear: currentYear,
        defaultCacheMin: defaultCacheMin,
        routing: {

            prefix: '',
            html5Mode: false

        }
    };

}());