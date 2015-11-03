import list from "./list/index";
import tree from "./tree/index";
import datagrid from "./datagrid/index";

export default angular.module("components.list", [list, tree, datagrid])
	.name;