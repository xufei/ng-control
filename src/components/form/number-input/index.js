import NumberInputDirective from "./directives/number-input";

export default angular.module("components.form.numberInput", [])
	.directive("snNumberInput", () => new NumberInputDirective())
	.name;