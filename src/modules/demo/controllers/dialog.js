import tpl from "../../../modules/demo/partials/test-dialog.html";

export class DialogController {
	constructor($scope, DialogService) {
		this.DialogService = DialogService;

		$scope.result = "";

		$scope.myDialog = function () {
			DialogService.modal({
				key: "sn.controls.test.dialog",
				template: tpl,
				accept(params) {
					$scope.result = params;
				},
				refuse(reason) {
					alert("用户拒绝了，原因是：" + reason);
				}
			}, { name: "可以传参数到对话框的controller去：" });
		};
	}
}

DialogController.$inject = ["$scope", "DialogService"];


export class TestDialogController {
	constructor($scope, DialogService) {
		$scope.ok = () => DialogService.accept("sn.controls.test.dialog", $scope.name);
		$scope.cancel = () => DialogService.refuse("sn.controls.test.dialog", "我不想填");
		$scope.close = () => DialogService.dismiss("sn.controls.test.dialog");
	}
}

TestDialogController.$inject = ["$scope", "DialogService"];