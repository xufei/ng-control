import DatePickerDirective from "./directives/datepicker";

export default angular.module("components.form.datepicker", [])
	.directive("snDatepicker", () => new DatePickerDirective())
	.name;