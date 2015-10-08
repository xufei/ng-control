import template from "../templates/multi-select.html";

export default class MultiSelectDirective {
	constructor(UIHelper) {
		this.UIHelper = UIHelper;
		
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
		
		scope.selectedItems = scope.selectedItems || [];
		
        let closeEvent = this.UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.$digest();
            }
        });
	}

	controller($scope) {
		$scope.showPop = function() {
			if ($scope.disabled) {
				return;
			}
			$scope.pop = true;
		};

		$scope.select = function(item) {
			item.$checked = !item.$checked;
			
			$scope.selectedItems = $scope.options.filter(v => v.$checked);
		};
		
		$scope.selectedItemsStr = function() {
			return $scope.selectedItems.reduce((last, current) => last + current.name + ";", "");
		};
	}
}

MultiSelectDirective.$inject = ["UIHelper"];