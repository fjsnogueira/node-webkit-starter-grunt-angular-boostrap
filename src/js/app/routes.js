(function (angular, appCfg) {
    'use strict';

    var appRoutes = angular.module('app.Routes', ['ui.router']);

    appRoutes.constant('appCfg', appCfg);

    appRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
//			.when('/f/{feedUrl:.*}', 'feed/{feedUrl:.*}')
//			.when('/{feedUrl:(http|https).*}', 'feed/{feedUrl:.*}')
            .otherwise('/home');

        $stateProvider
            .state('home', {
                templateUrl: 'partials/content.html',
                controller: 'MainCtrl'
            });
        $stateProvider
            .state('home.main', {
                url: '/home',
                pageTitle: 'Start',
                views: {
                    'mainData': {
                        templateUrl: 'partials/main/home.html',
                        controller: 'MainCtrl'
                    }
                }
            });
    }]);

    appRoutes.run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
                // to active whenever 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }]);
})(angular, appCfg);