import template from "../templates/multi-select.html";

export default class SelectDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			selectedItems: "=",
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

		$scope.select = function(item) {
			item.$checked = !item.$checked;
		};
		
		$scope.selectedItemsStr = function() {
			return $scope.options.reduce((last, current) => current.$checked ? (last + current.name + ";") : last, "");
		};
	}
}