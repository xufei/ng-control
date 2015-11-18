import DataGridController from "../controllers/datagrid";

import template from "../templates/datagrid.html";
import defaultHeaderCellTpl from "../templates/default-header-cell.html";
import defaultCellTpl from "../templates/default-cell.html";

import sortHeaderCellTpl from "../templates/sort-header-cell.html";

import checkboxHeaderCellTpl from "../templates/checkbox-header-cell.html";
import checkboxCellTpl from "../templates/checkbox-cell.html";

import "../css/datagrid.css";

export default class DataGridDirective {
	constructor($compile) {
		this.restrict = "E";
		this.template = template;
		
		this.controller = DataGridController;
		this.controllerAs = "datagridCtrl";
		this.bindToController = true;

		this.scope = {
			cols: "=gridCols",
			data: "=gridData",
			headerCellTpl: "=",
			cellTpl: "=",
			type: "="
		};

		this.$compile = $compile;
				
		this.tpls = {
			default: [defaultHeaderCellTpl, defaultCellTpl],
			sortable: [sortHeaderCellTpl, defaultCellTpl],
			checkable: [checkboxHeaderCellTpl, checkboxCellTpl]
		};
	}

	link(scope, element, attrs) {
		let type = scope.datagridCtrl.type || "default";
		let headerCellTpl = scope.datagridCtrl.headerCellTpl || this.tpls[type][0];
		let cellTpl = scope.datagridCtrl.cellTpl || this.tpls[type][1];

		angular.element(element.find("tr")[0]).html(headerCellTpl);
		angular.element(element.find("tbody")[0]).html(`<tr ng-repeat="item in datagridCtrl.data">${cellTpl}</tr>`);

		this.$compile(angular.element(element.find("thead")[0]))(scope);
		this.$compile(angular.element(element.find("tbody")[0]))(scope);
		
		scope.$watchCollection("datagridCtrl.data", () => scope.datagridCtrl.$allChecked = scope.datagridCtrl.data.every(it => it.$checked));
	}
}

DataGridDirective.$inject = ["$compile"];