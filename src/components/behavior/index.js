import contextmenu from "./contextmenu/index";
import dropdown from "./dropdown/index";
import indeterminate from "./indeterminate/index";

export default angular.module("components.behavior", [contextmenu, dropdown, indeterminate])
	.name;