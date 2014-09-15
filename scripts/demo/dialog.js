angular.module("sn.demo").controller("TestDialogCtrl", ["$scope", "DialogService", function ($scope, DialogService) {
	$scope.result = "";

	$scope.dialog = function () {
		DialogService.modal({
			key: "sn.controls.test.dialog",
			url: "partials/demo/dialog.html",
			accept: function (params) {
				$scope.result = params;
			},
			refuse: function(reason) {
				alert("用户拒绝了，原因是：" + reason);
			}
		}, {name: "可以传参数到对话框的controller去"});
	};
}]);

angular.module("sn.demo").controller("DialogCtrl", ["$scope", "DialogService", function ($scope, DialogService) {
	$scope.ok = function () {
		DialogService.accept("sn.controls.test.dialog", $scope.name);
	};

	$scope.cancel = function () {
		DialogService.refuse("sn.controls.test.dialog", "我不想填");
	};

	$scope.close = function () {
		DialogService.dismiss("sn.controls.test.dialog");
	};
}]);