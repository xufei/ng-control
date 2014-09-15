angular.module("sn.demo").controller("TestHintCtrl", ["$scope", "HintService", function($scope, HintService) {
	$scope.operation = "测试操作结果a";

	$scope.hint = function() {
		HintService.hint({title: "我操作成功了", content: "结果是：" + $scope.operation
		});
	};
}]);