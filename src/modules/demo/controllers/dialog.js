export class DialogController {
	constructor($scope, DialogService) {
		this.DialogService = DialogService;

		$scope.result = "";

		$scope.myDialog = function () {
			DialogService.modal({
				key: "sn.controls.test.dialog",
				url: "modules/demo/partials/test-dialog.html",
				accept: function (params) {
					$scope.result = params;
				},
				refuse: function (reason) {
					alert("用户拒绝了，原因是：" + reason);
				}
			}, { name: "可以传参数到对话框的controller去：" });
		};
	}
}

DialogController.$inject = ["$scope", "DialogService"];


export class TestDialogController {
	constructor($scope, DialogService) {
		$scope.ok = function () {
			DialogService.accept("sn.controls.test.dialog", $scope.name);
		};

		$scope.cancel = function () {
			DialogService.refuse("sn.controls.test.dialog", "我不想填");
		};

		$scope.close = function () {
			DialogService.dismiss("sn.controls.test.dialog");
		};
	}
}

TestDialogController.$inject = ["$scope", "DialogService"];