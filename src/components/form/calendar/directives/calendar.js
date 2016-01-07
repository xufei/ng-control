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
			date: "=",
			dateClick: "&"
		};
	}
}