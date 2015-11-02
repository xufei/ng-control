import template from "../templates/tree-select.html";
import "../css/tree-select.css";

export default class TreeSelectDirective {
	constructor(UIHelper) {
		this.UIHelper = UIHelper;
		
		this.template = template;
		this.restrict = "E";

		this.scope = {
			selectedItem: "=ngModel",
			treeData: "=",
			placeholder: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		
		scope.placeholder = scope.placeholder || "请选择";
		
        let closeEvent = this.UIHelper.listen(window, "click", (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.$digest();
            }
        });
		
		scope.$on("$destroy", () => closeEvent.remove());
	}

	controller($scope) {
		var selectedPath = [];
		
		$scope.pop = false;
		
		$scope.selected = (item) => {
			return selectedPath.indexOf(item) >= 0;
		};

		$scope.showPop = () => {
			if ($scope.disabled) {
				return;
			}
			$scope.pop = true;
		};

		$scope.select = (...item) => {
			$scope.selectedItem = item[0];
			$scope.pop = false;
			
			selectedPath = item;
		};
	}
}

TreeSelectDirective.$inject = ["UIHelper"];