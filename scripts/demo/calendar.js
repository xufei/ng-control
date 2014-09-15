angular.module("sn.demo").controller("TestCalendarCtrl", ["$scope", function($scope) {
	$scope.initYear = 2012;
	$scope.initMonth = 3;
	$scope.initDate = 9;

	$scope.$on("sn.controls.calendar:yearChanged", function (evt, year) {
		alert("年份变更为：" + year);
		evt.stopPropagation();
	});

	$scope.$on("sn.controls.calendar:monthChanged", function (evt, month) {
		alert("月份变更为：" + month);
		evt.stopPropagation();
	});

	$scope.$on("sn.controls.calendar:dateChanged", function (evt, date) {
		alert("日期变更为：" + date);
		evt.stopPropagation();
	});
}]);