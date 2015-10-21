export default class TreeSelectController {
	constructor($scope) {
		$scope.areaData = [{
			name : "江苏",
			code : "js",
			children : [{
				name : "南京",
				code : "nj",
				children : [{
					name : "江宁",
					code : "jn",
					children : [{
						name : "秣陵",
						code : "ml"
					}, {
						name : "湖熟",
						code : "cs"
					}]
				}, {
					name : "溧水",
					code : "ls"
				}]
			}, {
				name : "苏州",
				code : "sz",
				children : [{
					name : "吴江",
					code : "wj"
				}, {
					name : "常熟",
					code : "cs"
				}]
			}]
		}, {
			name : "云南",
			code : "yn"
		}, {
			name : "福建",
			code : "fj"
		}];
		
		$scope.item1 = $scope.areaData[0].children[1];
	}
}

TreeSelectController.$inject = ["$scope"];