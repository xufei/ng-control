angular.module("sn.tests", []);

angular.module("sn.tests").controller("TestDateCtrl", function($scope) {
    $scope.getDate = function() {
        alert($scope.date1);
    };
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
	
	$scope.armyData = [{
		name : "第5军杜聿明（军长）",
		children : [{
			name : "第200师戴安澜（师长）",
			children : [{
				name : "598团"
			}, {
				name : "599团"
			}, {
				name : "600团"
			}]
		}, {
			name : "新22师廖耀湘（师长）",
			children : [{
				name : "64团"
			}, {
				name : "65团"
			}, {
				name : "66团"
			}]
		}, {
			name : "新96师余韶（师长）",
			children : [{
				name : "286团"
			}, {
				name : "287团"
			}, {
				name : "288团"
			}]
		}]
	}, {
		name : "第6军甘丽初（军长）",
		children : [{
			name : "第49师彭壁生（师长）"
		}, {
			name : "第93师吕国铨（师长）"
		}, {
			name : "暂编第55师陈勉吾（师长）"
		}]
	}, {
		name : "第66军张轸（军长）",
		children : [{
			name : "新38师孙立人（师长）"
		}, {
			name : "新28师刘伯龙（师长）"
		}, {
			name : "新29师马维骥（师长）"
		}]
	}, {
		name : "第36师李志鹏（师长）"
	}];

	$scope.addNode = function() {
		$scope.areaData.push({
			name : "Test",
			code : "test"
		});
	};

	$scope.$on("sn.controls.tree:selectedNodeChanged", function(event, args) {
		event.stopPropagation();
		console.log(args.newNode.name);
	});
	
	$scope.$on("sn.controls.tree:nodeIconClicked", function(event, args) {
		event.stopPropagation();
		console.log(args.currentNode.$collapsed);
	});
});

angular.module("sn.tests").controller("TestPagerCtrl", function($scope) {
	$scope.totalItems1 = 577;
	$scope.totalItems2 = 33;

	$scope.changeTotal = function() {
		$scope.totalItems1 = 77;
	};

	$scope.$on("sn.controls.pager:pageIndexChanged", function(event, args) {
		event.stopPropagation();
		console.log(args.pageIndex);
	})
});