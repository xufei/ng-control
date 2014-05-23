angular.module("sn.tests", []);

angular.module("sn.tests").controller("TestPagerCtrl1", function($scope) {
	$scope.totalItems1 = 577;
	$scope.totalItems2 = 33;
	
	$scope.changeTotal = function() {
		$scope.totalItems1 = 77;
	};

	$scope.$on("sn.controls.pager:pageIndexChange", function(event) {
		event.stopPropagation();
		console.log(event.targetScope.currentPage);
	})
});

angular.module("sn.tests").controller("TestTreeCtrl", function($scope) {
	$scope.areaData = [{
		name : "Jiangsu",
		code : "js",
		children : [{
			name : "Nanjing",
			code : "nj"
		}, {
			name : "Suzhou",
			code : "sz",
			children : [{
				name : "Wujiang",
				code : "wj"
			}, {
				name : "Changshu",
				code : "cs"
			}]
		}]
	}, {
		name : "Yunnan",
		code : "yn"
	}, {
		name : "Fujian",
		code : "fj"
	}];
}); 