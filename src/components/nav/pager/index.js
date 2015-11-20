import PagerDirective from "./directives/pager";

export default angular.module("components.nav.pager", [])
	.directive("snPager", () => new PagerDirective())
	.name;