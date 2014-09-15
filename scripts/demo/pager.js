angular.module("sn.demo").controller("TestPagerCtrl", function($scope) {
	$scope.totalItems1 = 577;
	$scope.totalItems2 = 33;

	$scope.changeTotal = function() {
		$scope.totalItems1 = 77;
	};

	$scope.$on("sn.controls.pager:pageIndexChanged", function(event, args) {
		event.stopPropagation();
		console.log(args.pageIndex);
	})
});