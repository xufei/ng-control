import DateRangePickerDirective from "./directives/daterangepicker";

export default angular.module("components.form.daterangepicker", [])
	.directive("snDateRangePicker", () => new DateRangePickerDirective())
	.name;