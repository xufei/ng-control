import tree from "./tree/index";
import datagrid from "./datagrid/index";

export default angular.module("components.list", [tree, datagrid])
	.name;