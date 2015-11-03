import ListDirective from "./directives/list";

import DirectiveFactory from "../../utils/directive";

export default angular.module("components.list.list", [])
	.directive("snList", DirectiveFactory.create(ListDirective))
	.name;