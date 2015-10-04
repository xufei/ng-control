import template from "../templates/checkbox.html";

export default class CheckboxDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			checked: "=ngModel",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
	}

	controller($scope) {
	}
}