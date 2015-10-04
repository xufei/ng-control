import template from "../templates/number-input.html";

export default class NumberInputDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minValue: "=",
			maxValue: "=",
			value: "=ngModel",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;

		if (!scope.value) {
			scope.value = 0;
		}
	}

	controller($scope) {
		$scope.decrease = function() {
			if ($scope.disabled) {
				return;
			}

			if ($scope.minValue) {
				if ($scope.value <= $scope.minValue) {
					return;
				}
			}
			$scope.value--;
		};

		$scope.increase = function() {
			if ($scope.disabled) {
				return;
			}

			if ($scope.maxValue) {
				if ($scope.value >= $scope.maxValue) {
					return;
				}
			}
			$scope.value++;
		};
	}
}