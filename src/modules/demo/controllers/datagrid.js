import checkboxCellTpl from "../../../modules/demo/partials/datagrid/checkbox-cell.html";
import sortHeaderCellTpl from "../../../modules/demo/partials/datagrid/sort-header-cell.html";
import checkboxHeaderCellTpl from "../../../modules/demo/partials/datagrid/checkbox-header-cell.html";
import buttonCellTpl from "../../../modules/demo/partials/datagrid/button-cell.html";

export default class DataGridController {
	constructor($scope) {
		$scope.cols = [
			{label: "Name", key: "name"},
			{label: "Age", key: "age"},
			{label: "Gender", key: "gender"}
		];
		
		$scope.students = [
			{ name: "Tom", age: 18, gender: "1" },
			{ name: "Lily", age: 15, gender: "0" },
			{ name: "Jerry", age: 14, gender: "1" }
		];
		
		$scope.checkboxCols = [
			{label: "", key: "$checked"},
			{label: "Name", key: "name"},
			{label: "Age", key: "age"},
			{label: "Gender", key: "gender"}
		];
		
		$scope.checkboxTpl = checkboxCellTpl;
		$scope.sortHeaderTpl = sortHeaderCellTpl;
		
		$scope.headerSort = (key) => {
			$scope.desc = !$scope.desc;
			
			if ($scope.desc) {
				$scope.students.sort((a, b) => a[key] - b[key]);
			}
			else {
				$scope.students.sort((a, b) => b[key] - a[key]);
			}
		};
		
		$scope.checkboxHeaderTpl = checkboxHeaderCellTpl;
		
		$scope.buttonCellTpl = buttonCellTpl;
		
		$scope.buttonCols = [
			{label: "", key: "$checked"},
			{label: "Name", key: "name"},
			{label: "Age", key: "age"},
			{label: "Gender", key: "gender"},
			{label: "", key: "$operation"}
		];
	}
}

DataGridController.$inject = ["$scope"];