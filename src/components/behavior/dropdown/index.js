import DirectiveFactory from "../../utils/directive";

import DropdownDirective from "./directives/dropdown";

export default angular.module("components.behavior.dropdown", [])
	.directive("snDropdown", DirectiveFactory.create(DropdownDirective))
	.name;
	