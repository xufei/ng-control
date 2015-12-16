import template from "../templates/tree-select.html";

import { UIHelper } from "../../../utils/ui-helper";

import TreeSelectController from "../controllers/tree-select";

import "../css/tree-select.css";

export default class TreeSelectDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.controller = TreeSelectController;
		this.controllerAs = "treeselectCtrl";
		this.bindToController = true;

		this.scope = {
			selectedItem: "=ngModel",
			treeData: "=",
			placeholder: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		scope.treeselectCtrl.placeholder = scope.treeselectCtrl.placeholder || "请选择";
		
        let closeEvent = UIHelper.listen(window, "click", (e) => {
            if (!element[0].contains(e.target)) {
                scope.treeselectCtrl.pop = false;
				scope.$digest();
            }
        });

		scope.$on("$destroy", () => closeEvent.remove());
	}
}
