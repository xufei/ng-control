angular.module("sn.demo").controller("TestDateCtrl", function($scope) {
	$scope.date1 = new Date(2014, 3, 2, 6, 6, 6);

	$scope.getDate = function() {
		alert($scope.date2);
	};
});