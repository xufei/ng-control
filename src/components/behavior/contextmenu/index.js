import DirectiveFactory from "../../utils/directive";

import ContextMenuDirective from "./directives/contextmenu";

export default angular.module("components.behavior.contextmenu", [])
	.directive("snContextmenu", DirectiveFactory.create(ContextMenuDirective))
	.name;
	