import DateRangePickerDirective from "./directives/daterangepicker";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.form.daterangepicker", [])
	.directive("snDateRangePicker", DirectiveFactory.create(DateRangePickerDirective))
	.name;