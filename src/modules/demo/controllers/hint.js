export default class HintController {
	constructor($scope, HintService) {
		$scope.hintContent = "测试操作结果a";
		
		$scope.myHint = function() {
			HintService.hint({title: "我操作成功了", content: "结果是：" + $scope.hintContent})
		};
	}
}

HintController.$inject = ["$scope", "HintService"];