import form from "./form/index";
import nav from "./nav/index";
import list from "./list/index";

import services from "./services/index";

export default angular.module("sn.components", [form, nav, list, services])
	.name;