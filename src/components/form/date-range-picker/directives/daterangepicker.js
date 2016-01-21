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
		this.bindToController = true;

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
			fromDate: "=",
			toDate: "=",
            initFromDate: "=",
            initToDate: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
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
		
		scope.$watch("pickerCtrl.fromDate", fromDate => {
			scope.pickerCtrl.updateStr(fromDate, scope.pickerCtrl.toDate);
		});
		
		scope.$watch("pickerCtrl.toDate", toDate => {
			scope.pickerCtrl.updateStr(scope.pickerCtrl.fromDate, toDate);
		});
	}
}