import template from "../templates/select.html";

export default class SelectDirective {
	constructor(UIHelper) {
		this.UIHelper = UIHelper;
		
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
		
        let closeEvent = this.UIHelper.listen(window, 'click', (e) => {
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

SelectDirective.$inject = ["UIHelper"];