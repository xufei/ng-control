import DateTimePickerDirective from "./directives/datetimepicker";

export default angular.module("components.form.datetimepicker", [])
	.directive("snDatetimepicker", () => new DateTimePickerDirective())
	.name;