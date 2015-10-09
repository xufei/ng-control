import ClockDirective from "./directives/clock";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.svg.clock", [])
	.directive("snClock", DirectiveFactory.create(ClockDirective))
	.name;