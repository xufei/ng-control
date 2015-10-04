export default class SelectController {
	constructor($scope) {
		$scope.options = [
			{name: "aaa", value: 111},
			{name: "bbb", value: 222},
			{name: "ccc", value: 332}
		];
	}
}

SelectController.$inject = ["$scope"];