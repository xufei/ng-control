"use strict";

import form from "./form/index";
import nav from "./nav/index";
import list from "./list/index";

export default angular.module("components", [form, nav, list])
	.name;