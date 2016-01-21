import template from "../templates/datetimepicker.html";

import { UIHelper } from "../../../utils/ui-helper";

import DateTimePickerController from "../controllers/datetimepicker";

import "../css/datetimepicker.css";

export default class DateTimePickerDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.controller = DateTimePickerController;
		this.controllerAs = "datepickerCtrl";
		this.bindToController = true;

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
            initDate: "=",
			selectedDate: "=ngModel",
			disabled: "=",
			showTime: "="
		};
	}

	link(scope, element, attrs) {
		scope.placeholder = scope.placeholder || "请选择日期";

		let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.datepickerCtrl.dateClick();
            }
        });

		scope.$on('$destroy', () => closeEvent.remove());
	}
}