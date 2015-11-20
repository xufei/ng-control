import SelectDirective from "./directives/select";

export default angular.module("components.form.select", [])
	.directive("snSelect", () => new SelectDirective())
	.name;