import MenuDirective from "./directives/menu";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.nav.menu", [])
	.directive("snMenu", DirectiveFactory.create(MenuDirective))
	.name;