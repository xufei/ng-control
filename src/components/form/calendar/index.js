import CalendarDirective from "./directives/calendar";

export default angular.module("components.form.calendar", [])
	.directive("snCalendar", () => new CalendarDirective())
	.name;