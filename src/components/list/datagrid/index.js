import DataGridDirective from "./directives/datagrid";

import DirectiveFactory from "../../utils/directive";

export default angular.module("components.list.datagrid", [])
	.directive("snDatagrid", DirectiveFactory.create(DataGridDirective))
	.name;