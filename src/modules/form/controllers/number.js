export default class NumberController {
	constructor($scope) {
		$scope.value = 5;

		$scope.maxValue = 11;
	}
}

NumberController.$inject = ["$scope"];