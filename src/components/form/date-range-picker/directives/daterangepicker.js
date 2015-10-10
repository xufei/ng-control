import template from "../templates/daterangepicker.html";

import "../css/daterangepicker.css";

export default class DateRangePickerDirective {
	constructor($filter, $timeout, UIHelper) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
			fromDate: "=",
			toDate: "=",
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
				scope.$digest();
            }
        });
		
		scope.$on('$destroy', function() {
            closeEvent.remove();
        });
	}

	controller($scope) {
		$scope.$watchGroup(["fromDate", "toDate"], (newValues, oldValues) => {
			$scope.currentDateStr = this.$filter('date')(newValues[0] || "未选择开始日期", "yyyy-MM-dd")
			+ " 至 " + this.$filter('date')(newValues[1] || "未选择结束日期", "yyyy-MM-dd");
		});

		$scope.showPop = function () {
			if (!$scope.disabled) {
				$scope.pop = true;
			}
		};

		$scope.dateClick = () => {};
	}
}

DateRangePickerDirective.$inject = ["$filter", "$timeout", "UIHelper"];