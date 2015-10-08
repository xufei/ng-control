import template from "../templates/datepicker.html";

import "../css/datepicker.css";

export default class DatePickerDirective {
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
		scope.placeholder = scope.placeholder || "请选择日期";

		let closeEvent = this.UIHelper.listen(window, 'click', (e) => {
            if (!element[0].contains(e.target)) {
                scope.pop = false;
				scope.currentDate = scope.selectedDate;
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', function() {
            closeEvent.remove();
        });
	}

	controller($scope) {
		$scope.$watch("currentDate", function(newDate) {
			if (newDate) {
				$scope.selectedDate = newDate;
				$scope.currentDateStr = this.$filter('date')(newDate, "yyyy-MM-dd");
			}
		}.bind(this));

		$scope.showPop = function() {
			if (!$scope.disabled) {
				$scope.pop = true;
			}
		};

		$scope.dateClick = function() {
			this.$timeout(function() {
				$scope.currentDate = $scope.selectedDate;
			}, 0);
			$scope.pop = false;
		}.bind(this);
	}
}

DatePickerDirective.$inject = ["$filter", "$timeout", "UIHelper"];