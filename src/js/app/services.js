(function (angular) {
	'use strict';

	var safeApply = function (scope) {
		scope.$evalAsync();
//		if (!scope.$$phase) {
//			scope.$apply();
//		}
	};

	var appServices = angular.module('app.Services', []);

	appServices.factory('osInfo', [function () {
		var os = require('os');
		var data = {
			hostname: os.hostname(),
			type: os.type(),
			platform: os.platform(),
			arch: os.arch()
		};

		return data;
	}]);

}(angular));