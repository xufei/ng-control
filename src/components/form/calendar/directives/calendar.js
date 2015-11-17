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
			selectedDate: "=",
			dateClick: "&"
		};
	}
	
	link (scope) {
		// 这段代码太别扭了，但问题是如果搬到controller里面去写成setter，会在constructor之前执行，真头疼，先这样吧
		scope.$watch("calendarCtrl.selectedDate", newDate => {
			if (newDate) {
				scope.calendarCtrl.calendar.year = newDate.getFullYear();
				scope.calendarCtrl.calendar.month = newDate.getMonth();
				scope.calendarCtrl.calendar.date = newDate.getDate();
			}
		});
	}
}