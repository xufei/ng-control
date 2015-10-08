import MultiSelectDirective from "./directives/multi-select";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.form.multiSelect", [])
	.directive("snMultiSelect", DirectiveFactory.create(MultiSelectDirective))
	.name;