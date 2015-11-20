import IndeterminateDirective from "./directives/indeterminate";

export default angular.module("components.behavior.indeterminate", [])
	.directive("snIndeterminate", () => new IndeterminateDirective())
	.name;