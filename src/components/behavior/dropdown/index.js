import DropdownDirective from "./directives/dropdown";

export default angular.module("components.behavior.dropdown", [])
	.directive("snDropdown", () => new DropdownDirective())
	.name;
	