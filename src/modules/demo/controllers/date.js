export default class DateController {
	constructor($scope) {
		$scope.oneDay = new Date(2012, 3, 9);

		$scope.min = new Date(2015, 8, 3);
		$scope.max = new Date(2016, 2, 1);
	}
}

DateController.$inject = ["$scope"];