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
			currentDate: "=ngModel",
			disabled: "=",
			showTime: "="
		};
	}

	link(scope, element, attrs) {
		scope.placeholder = scope.placeholder || "请选择日期";

		let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.datepickerCtrl.pop = false;
				scope.datepickerCtrl.getDate();
				scope.$digest();
            }
        });

		scope.$on('$destroy', () => closeEvent.remove());
		
		scope.$watch("datepickerCtrl.currentDate", newDate => {
			scope.datepickerCtrl.setDate(newDate);
		});
		
		scope.$watchGroup(["datepickerCtrl.year", "datepickerCtrl.month", "datepickerCtrl.day"], ([year, month, day]) => {
			let date = scope.datepickerCtrl.selectedDate;
			
			if (date) {
				date.setYear(year);
				date.setMonth(month);
				date.setDay(day);
				
				scope.datepickerCtrl.updateStr(date);
			}
		});
		
		scope.$watchGroup(["datepickerCtrl.hour", "datepickerCtrl.minute", "datepickerCtrl.second"], ([hour, minute, second]) => {
			let date = scope.datepickerCtrl.selectedDate;
			
			console.log(hour);
			
			if (date) {
				date.setHours(hour);
				date.setMinutes(minute);
				date.setSeconds(second);
				
				scope.datepickerCtrl.updateStr(date);
			}
		});
	}
}