"use strict";

import PagerDirective from "./directives/pager";

import DirectiveFactory from "../../../utils/directive";

export default angular.module("components.nav.pager", [])
	.directive("snPager", DirectiveFactory.create(PagerDirective))
	.name;