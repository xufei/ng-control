import template from "../templates/select.html";

export default class SelectDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			selectedItem: "=ngModel",
			options: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
	}

	controller($scope) {
		$scope.pop = false;

		$scope.showPop = function() {
			if ($scope.disabled) {
				return;
			}

			$scope.pop = true;
		};
	}
}