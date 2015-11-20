import TimePickerDirective from "./directives/timepicker";

export default angular.module("components.form.timepicker", [])
	.directive("snTimepicker", () => new TimePickerDirective())
	.name;