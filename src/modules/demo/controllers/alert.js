export default class AlertController {
	constructor($scope, AlertService) {
		this.AlertService = AlertService;
		
		$scope.myAlert = this.myAlert.bind(this);
		$scope.myConfirm = this.myConfirm.bind(this);
	}

	myAlert() {
		this.AlertService
			.alert({
				title: "测试",
				content: "你好，我是警告"
			})
			.then(function () {
				alert("你刚才点了确定");
			});
	}

	myConfirm() {
		this.AlertService
			.confirm({
				title: "测试",
				content: "你好，确定吗？"
			})
			.then(function () {
				alert("你刚才点了确定");
			}, function () {
				alert("你刚才点了取消");
			});
	}
}

AlertController.$inject = ["$scope", "AlertService"];