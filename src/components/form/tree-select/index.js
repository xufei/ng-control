import TreeSelectDirective from "./directives/tree-select";
import DirectiveFactory from "../../utils/directive";

export default angular.module("components.form.treeselect", [])
	.directive("snTreeSelect", DirectiveFactory.create(TreeSelectDirective))
	.name;