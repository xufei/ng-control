export default class PagerController {
	constructor($scope) {
		this.count = 177;
		
		$scope.$watch("pageCtrl.currentPage", page => {
			console.log(page);
		});
	}
    
    changeIndex() {
        this.currentPage = 1;
    }
}

PagerController.$inject = ["$scope"];