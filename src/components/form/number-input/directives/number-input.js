import template from "../templates/number-input.html";

import NumberInputController from "../controllers/number-input";

import "../css/number-input.css";

export default class NumberInputDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";
		
		this.controller = NumberInputController;
		this.controllerAs = "numberInputCtrl";
		this.bindToController = true;

		this.scope = {
			minValue: "=",
			maxValue: "=",
			value: "=ngModel",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		if (!scope.numberInputCtrl.value) {
			scope.numberInputCtrl.value = 0;
		}
	}
}