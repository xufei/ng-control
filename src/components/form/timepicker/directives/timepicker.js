import template from "../templates/timepicker.html";

import "../css/timepicker.css";

export default class TimePickerDirective {
	constructor($filter, $timeout, UIHelper) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
			currentDate: "=ngModel",
			disabled: "="
		};

		this.$filter = $filter;
		this.$timeout = $timeout;
		this.UIHelper = UIHelper;
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		scope.placeholder = scope.placeholder || "请选择时间";

		let closeEvent = this.UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.currentDate = scope.selectedDate;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
	}

	controller($scope) {
		$scope.$watch("currentDate", newDate => {
			if (newDate) {
				$scope.selectedDate = newDate;
				$scope.currentDateStr = this.$filter('date')(newDate, "yyyy-MM-dd");
			}
		});

		$scope.showPop = function() {
			if (!$scope.disabled) {
				$scope.pop = true;
			}
		};

		$scope.dateClick = () => {
			this.$timeout(() => $scope.currentDate = $scope.selectedDate, 0);
			$scope.pop = false;
		};
	}
}

TimePickerDirective.$inject = ["$filter", "$timeout", "UIHelper"];