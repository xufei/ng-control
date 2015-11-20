import CheckboxDirective from "./directives/checkbox";

export default angular.module("components.form.checkbox", [])
	.directive("snCheckbox", () => new CheckboxDirective())
	.name;