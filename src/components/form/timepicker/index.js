import TimePickerDirective from "./directives/timepicker";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.form.timepicker", [])
	.directive("snTimepicker", DirectiveFactory.create(TimePickerDirective))
	.name;