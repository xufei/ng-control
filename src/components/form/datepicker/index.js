import DatePickerDirective from "./directives/datepicker";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.form.datepicker", [])
	.directive("snDatepicker", DirectiveFactory.create(DatePickerDirective))
	.name;