export default class SelectController {
	constructor($scope) {
		$scope.options = [
			{name: "aaa", value: 111},
			{name: "bbb", value: 222},
			{name: "ccc", value: 333},
			"seperator",
			{name: "ddd", value: 444},
			{name: "eee", value: 555}
		];
	}
}

SelectController.$inject = ["$scope"];