import template from "../templates/timepicker.html";

import { UIHelper } from "../../../utils/ui-helper";

import TimePickerController from "../controllers/timepicker";

import "../css/timepicker.css";

export default class TimePickerDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minTime: "=",
			maxTime: "=",
			placeholder: "=",
			hour: "=",
			minute: "=",
			second: "=",
			disabled: "="
		};

		this.controller = TimePickerController;
		this.controllerAs = "timepickerCtrl";
		this.bindToController = true;
	}

	link(scope, element, attrs) {
		scope.placeholder = scope.placeholder || "请选择时间";

		let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.currentDate = scope.selectedDate;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
	}
}