export default class DataGridController {
	constructor($scope) {
		$scope.cols = [
			{label: "Name", key: "name"},
			{label: "Age", key: "age"},
			{label: "Gender", key: "gender"}
		];
		
		$scope.students = [
			{ name: "Tom", age: 18, gender: "Male" },
			{ name: "Lily", age: 15, gender: "Female" },
			{ name: "Jerry", age: 14, gender: "Male" }
		];
	}
}

DataGridController.$inject = ["$scope"];