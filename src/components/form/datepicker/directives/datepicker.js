import template from "../templates/datepicker.html";

import { UIHelper } from "../../../utils/ui-helper";

import DatePickerController from "../controllers/datepicker";

import "../css/datepicker.css";

export default class DatePickerDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
			currentDate: "=ngModel",
			disabled: "="
		};
		
		this.controller = DatePickerController;
		this.controllerAs = "datepickerCtrl";
	}

	link(scope, element, attrs) {
		scope.placeholder = scope.placeholder || "请选择日期";

		let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.datepickerCtrl.pop = false;
				scope.currentDate = scope.datepickerCtrl.selectedDate;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
	}
}