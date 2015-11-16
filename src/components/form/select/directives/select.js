import template from "../templates/select.html";

import { UIHelper } from "../../../utils/ui-helper";

export default class SelectDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			selectedItem: "=ngModel",
			options: "=",
			placeholder: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		
		scope.placeholder = scope.placeholder || "请选择";
		
        let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
	}

	controller($scope) {
		$scope.pop = false;

		$scope.showPop = () => {
			if ($scope.disabled) {
				return;
			}
			$scope.pop = true;
		};

		$scope.select = item => {
			$scope.selectedItem = item;
			$scope.pop = false;
		};
	}
}

SelectDirective.$inject = [];