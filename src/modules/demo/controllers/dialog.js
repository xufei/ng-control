import tpl from "../../../modules/demo/partials/test-dialog.html";

export class DialogController {
	constructor(DialogService) {
		this.DialogService = DialogService;

		this.name = "aaaa";
	}
	
	myDialog() {
		this.DialogService.modal(tpl, { name: "pass in: " + this.name }, result => this.name = result.name);
	}
}

DialogController.$inject = ["DialogService"];



export class TestDialogController {
	ok() {
		this.dialog.onOk(this.dialog.data);
	}
}