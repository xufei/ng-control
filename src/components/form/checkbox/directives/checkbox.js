import template from "../templates/checkbox.html";

import "../css/checkbox.css";

export default class CheckboxDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			checked: "=ngModel",
			disabled: "=",
			indeterminate: "="
		};
	}

	link(scope, element, attrs) {
	}

	controller() {
	}
}