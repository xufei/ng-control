import contextmenu from "./contextmenu/index";
import tooltip from "./tooltip/index";
import dropdown from "./dropdown/index";
import indeterminate from "./indeterminate/index";

export default angular.module("components.behavior", [contextmenu, tooltip, dropdown, indeterminate])
	.name;