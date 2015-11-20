import MultiSelectDirective from "./directives/multi-select";

export default angular.module("components.form.multiSelect", [])
	.directive("snMultiSelect", () => new MultiSelectDirective())
	.name;