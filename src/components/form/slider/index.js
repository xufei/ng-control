import SliderDirective from "./directives/slider";

export default angular.module("components.form.slider", [])
	.directive("snSlider", () => new SliderDirective())
	.name;