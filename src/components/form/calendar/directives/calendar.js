import template from "../templates/calendar.html";
import CalendarCtrl from "../controllers/calendar";

import "../css/calendar.css";

export default class CalendarDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.controller = CalendarCtrl;
		this.controllerAs = "calendarCtrl";
		this.bindToController = true;

		this.scope = {
			minDate: "=",
			maxDate: "=",
			year: "=",
			month: "=",
			day: "=",
			dateClick: "&"
		};
	}
	
	link (scope) {
		// 这段代码太别扭了，但问题是如果搬到controller里面去写成setter，会在constructor之前执行，真头疼，先这样吧
		scope.$watchGroup(["calendarCtrl.year", "calendarCtrl.month", "calendarCtrl.day"], ([year, month, day]) => {
			scope.calendarCtrl.calendar.year = year;
			scope.calendarCtrl.calendar.month = month;
			scope.calendarCtrl.calendar.date = day;
		});
	}
}