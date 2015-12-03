export default class PagerController {
	constructor($scope) {
		this.count = 177;
		
		$scope.$watch("pageCtrl.currentPage", page => {
			console.log(page);
		});
	}
}

PagerController.$inject = ["$scope"];