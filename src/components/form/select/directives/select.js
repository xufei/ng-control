import template from "../templates/select.html";

import { UIHelper } from "../../../utils/ui-helper";

import SelectController from "../controllers/select";

export default class SelectDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";
		
		this.controller = SelectController;
		this.controllerAs = "selectCtrl";
		this.bindToController = true;

		this.scope = {
			selectedItem: "=ngModel",
			options: "=",
			placeholder: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		scope.selectCtrl.placeholder = scope.selectCtrl.placeholder || "请选择";
		
        let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.selectCtrl.pop = false;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
	}
}