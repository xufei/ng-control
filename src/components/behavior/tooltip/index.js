import DirectiveFactory from "../../utils/directive";

import ToolTipDirective from "./directives/tooltip";

export default angular.module("components.behavior.tooltip", [])
	.directive("snTooltip", DirectiveFactory.create(ToolTipDirective))
	.name;
	