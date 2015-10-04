import CalendarDirective from "./directives/calendar";

import DirectiveFactory from "../../../utils/directive";

export default angular.module("components.form.calendar", [])
	.directive("snCalendar", DirectiveFactory.create(CalendarDirective))
	.name;