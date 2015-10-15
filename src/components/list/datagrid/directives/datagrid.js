import template from "../templates/datagrid.html";

import "../css/datagrid.css";

export default class DataGridDirective {
	constructor($compile) {
		this.restrict = "E";
		this.template = template;

		this.scope = {
			cols: "=gridCols",
			data: "=gridData"
		};

		this.$compile = $compile;
	}

	link(scope, element, attrs) {
	}

	controller($scope) {
		$scope.aaa = () => {};
	}
}

DataGridDirective.$inject = ["$compile"];