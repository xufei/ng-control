"use strict";

import SliderDirective from "./directives/slider";

import DirectiveFactory from "../../../utils/directive";

export default angular.module("components.form.slider", [])
	.directive("snSlider", DirectiveFactory.create(SliderDirective))
	.name;