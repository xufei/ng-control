import template from "../templates/daterangepicker.html";

import "../css/daterangepicker.css";

export default class DateRangePickerDirective {
	constructor($document, $filter, $timeout) {
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

		this.$document = $document;
		this.$filter = $filter;
		this.$timeout = $timeout;
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		scope.placeholder = scope.placeholder || "请选择日期";

		this.$document.on("click", function (evt) {
			var src = evt.srcElement ? evt.srcElement : evt.target;
			if ((scope.pop) && (!element[0].contains(src))) {
				scope.pop = false;
				scope.currentDate = scope.selectedDate;
				scope.$digest();
			}
		});
	}

	controller($scope) {
		$scope.$watchGroup(["fromDate", "toDate"], function (newValues, oldValues) {
			$scope.currentDateStr = this.$filter('date')(newValues[0] || "未选择开始日期", "yyyy-MM-dd")
			+ " 至 " + this.$filter('date')(newValues[1] || "未选择结束日期", "yyyy-MM-dd");
		}.bind(this));

		$scope.showPop = function () {
			if (!$scope.disabled) {
				$scope.pop = true;
			}
		};

		$scope.dateClick = function () {
			this.$timeout(function () {
				//$scope.currentDate = $scope.selectedDate;
			}, 0);
			//$scope.pop = false;
		}.bind(this);
	}
}

DateRangePickerDirective.$inject = ["$document", "$filter", "$timeout"];