import template from "../templates/daterangepicker.html";

import { UIHelper } from "../../../utils/ui-helper";

import DateRangePickerController from "../controllers/daterangepicker";

import "../css/daterangepicker.css";

export default class DateRangePickerDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";
		
		this.controller = DateRangePickerController;
		this.controllerAs = "pickerCtrl";

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
			fromDate: "=",
			toDate: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		scope.placeholder = scope.placeholder || "请选择日期";
		
        let closeEvent = UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pickerCtrl.pop = false;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', function() {
            closeEvent.remove();
        });
	}
}