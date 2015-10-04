import template from "../templates/calendar.html";
import Calendar from "../../../models/calendar/calendar";

import "../css/calendar.css";

export default class CalendarDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "=",
			selectedDate: "=",
			dateClick: "&"
		};
	}

	link(scope) {
		this.$scope = scope;
	}

	controller($scope) {
		let calendar = new Calendar();
		$scope.calendar = calendar;

		$scope.monthArr = CalendarDirective.months;
		$scope.weekdayArr = CalendarDirective.weekdays;

		$scope.now = new Date();

		$scope.$watch("selectedDate", function(newDate) {
			if (newDate) {
				calendar.year = newDate.getFullYear();
				calendar.month = newDate.getMonth();
				calendar.date = newDate.getDate();
			}
		});

		$scope.viewMode = CalendarDirective.ViewStates.DATE;

		$scope.dateInRange = function(day) {
			if (!day) {
				return true;
			}

			if ($scope.minDate) {
				if (day.date - $scope.minDate < 0) {
					return false;
				}
			}
			if ($scope.maxDate) {
				if (day.date - $scope.maxDate > 0) {
					return false;
				}
			}
			return true;
		};

		$scope.selectDate = function (day) {
			if ($scope.dateInRange(day)) {
				calendar.date = day.date.getDate();

				$scope.selectedDate = new Date(calendar.year, calendar.month, calendar.date);

				if ($scope.dateClick) {
					$scope.dateClick(calendar.selectedDate);
				}
			}
		};

		$scope.selectMonth = function (month) {
			calendar.month = month;
			$scope.viewMode = CalendarDirective.ViewStates.DATE;

			$scope.selectedDate = new Date(calendar.year, calendar.month, calendar.date);
		};

		$scope.selectYear = function (year) {
			calendar.year = year;
			$scope.viewMode = CalendarDirective.ViewStates.DATE;

			$scope.selectedDate = new Date(calendar.year, calendar.month, calendar.date);
		};

		$scope.selectNow = function() {
			$scope.now = new Date();

			calendar.currentDate = $scope.now;
		};
	}
}

CalendarDirective.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
CalendarDirective.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

// 视图模式，一个三个，可以切换，默认是显示日期的
CalendarDirective.ViewStates = Object.freeze({
	DATE: 0,
	MONTH: 1,
	YEAR: 2
});