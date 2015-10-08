import template from "../templates/tree.html";

import "../css/tree.css";

export default class TreeDirective {
	constructor($compile) {
		this.restrict = "E";

		this.scope = {
			treeData: "="
		};

		this.$compile = $compile;
	}

	link(scope, element, attrs) {
		scope.treeId = attrs["treeId"];

		element.html(template);

		this.$compile(element.contents())(scope);
	}

	controller($scope) {
		$scope.$isTreeNode = true;
		
		if ($scope.treeData) {
			$scope.treeData.forEach(v => v.$checked=false);
		}

		$scope.getRoot = function() {
			let pointer = this;
			let parent = pointer.$parent;
			while (parent.$isTreeNode) {
				pointer = parent;
				parent = parent.$parent;
			}

			return pointer;
		};

		$scope.arrowClass = function(node) {
			if (node.children && node.children.length > 0) {
				if (node.$expanded) {
					return "glyphicon-triangle-bottom";
				}
				else {
					return "glyphicon-triangle-right";
				}
			}
			else {
				return "";
			}
		};

		$scope.select = function(node) {
			if (node != $scope.selectedNode) {
				let root = $scope.getRoot();
				if (root.selectedNode) {
					root.selectedNode.$selected = false;
				}
				node.$selected = true;

				root.selectedNode = node;

				let evt = {newNode:node, oldNode:$scope.selectedNode, treeId: root.treeId};

				root.$emit("sn.controls.tree:selectedNodeChanged", evt);
			}
		};

		$scope.itemClick = function(node) {
			this.select(node);

			node.$checked = !node.$checked;
			checkChildren(node);
			$scope.$emit("sn.controls.tree:itemChecked", {});
		};

		$scope.itemCheck = function(node) {
			checkChildren(node);
			$scope.$emit("sn.controls.tree:itemChecked", {});
		};

		$scope.$on("sn.controls.tree:itemChecked", function(e) {
			if ($scope.treeData) {
				$scope.treeData.forEach(function(node) {
					if (node.children) {
						let checkedLength = node.children.filter(function (it) {
							return it.$checked;
						}).length;

						if (checkedLength == node.children.length) {
							node.$checked = true;
						}
						else if (checkedLength == 0) {
							node.$checked = false;
						}
						else {
							node.$checked = null;
						}
					}
				});
			}
		});

		function checkChildren(node) {
			if (node.children) {
				node.children.forEach(function(it) {
					it.$checked = node.$checked;

					checkChildren(it);
				});
			}
		}

		$scope.iconClick = function(node) {
			node.$expanded = !node.$expanded;

			$scope.getRoot().$emit("sn.controls.tree:nodeIconClicked", {currentNode: node});
		};
	}
}

TreeDirective.$inject = ["$compile"];