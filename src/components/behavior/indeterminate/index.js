import DirectiveFactory from "../../utils/directive";

import IndeterminateDirective from "./directives/indeterminate";

export default angular.module("components.behavior.indeterminate", [])
	.directive("snIndeterminate", DirectiveFactory.create(IndeterminateDirective))
	.name;