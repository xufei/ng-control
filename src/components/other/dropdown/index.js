import DropdownDirective from "./directives/dropdown";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.other.dropdown", [])
	.directive("snDropdown", DirectiveFactory.create(DropdownDirective))
	.name;