import template from "../templates/multi-select.html";

import { UIHelper } from "../../../utils/ui-helper";

import MultiSelectController from "../controllers/multi-select";

export default class MultiSelectDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";
		
		this.controller = MultiSelectController;
		this.controllerAs = "multiSelectCtrl";
		this.bindToController = true;

		this.scope = {
			selectedItems: "=",
			options: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		scope.selectedItems = scope.selectedItems || [];
		
        let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
	}
}