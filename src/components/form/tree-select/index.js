import TreeSelectDirective from "./directives/tree-select";

export default angular.module("components.form.treeselect", [])
	.directive("snTreeSelect", () => new TreeSelectDirective())
	.name;