export default class TreeController {
	constructor($scope) {
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

		$scope.$on("sn.controls.tree:selectedNodeChanged", function(evt, data) {
			$scope.selectedTreeItem = data.newNode;
		});

		$scope.getCheckedItems = function() {
			console.table(getCheckedItems($scope.areaData));
		};

		$scope.expandAll = function() {
			$scope.areaData.forEach(it => expandItem(it, true));
		};

		$scope.collapseAll = function() {
			$scope.areaData.forEach(it => expandItem(it, false));
		};

		function expandItem(data, flag) {
			if (data.children) {
				data.$expanded = flag;

				data.children.forEach(it => expandItem(it, flag));
			}
		}

		function getCheckedItems(data) {
			var result = [];
			data.forEach(it => {
				if (it.$checked) {
					result.push(it);
				}

				if (it.children) {
					result = result.concat(getCheckedItems(it.children));
				}
			});

			return result;
		};
	}
}

TreeController.$inject = ["$scope"];