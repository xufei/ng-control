import template from "../templates/datagrid.html";
import defaultHeaderCellTpl from "../templates/default-header-cell.html";
import defaultCellTpl from "../templates/default-cell.html";

import "../css/datagrid.css";

export default class DataGridDirective {
	constructor($compile) {
		this.restrict = "E";
		this.template = template;

		this.scope = {
			cols: "=gridCols",
			data: "=gridData",
			headerCellTpl: "=",
			cellTpl: "="
		};

		this.$compile = $compile;
	}

	compile(element, attributes) {

		return {
			pre: (scope, element, attributes, controller, transcludeFn) => {
				scope.headerCellTpl = scope.headerCellTpl || defaultHeaderCellTpl;
				scope.cellTpl = scope.cellTpl || defaultCellTpl;

				angular.element(element.find("tr")[0]).append(angular.element(scope.headerCellTpl));
				angular.element(element.find("tbody")[0]).append(angular.element('<tr ng-repeat="item in data"></tr>"'));
				angular.element(element.find("tr")[1]).append(angular.element(scope.cellTpl));

				this.$compile(angular.element(element.find("thead")[0]))(scope);
				this.$compile(angular.element(element.find("tbody")[0]))(scope);
			}
		};
	}

	link(scope, element, attrs) {
	}

	controller($scope) {
		$scope.checkAll = () => $scope.data.forEach(it => it.$checked = $scope.$allChecked);
		
		$scope.checkItem = item => $scope.$allChecked = $scope.data.every(it => it.$checked);
		
		$scope.$watchCollection("data", () => $scope.$allChecked = $scope.data.every(it => it.$checked));
	}
}

DataGridDirective.$inject = ["$compile"];