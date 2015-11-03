import template from "../templates/tree.html";
import defaultNodeTpl from "../templates/default-node.html";
import checkboxNodeTpl from "../templates/checkbox-node.html";

import "../css/tree.css";

export default class TreeDirective {
	constructor($compile) {
		this.restrict = "E";
		this.template = template;

		this.scope = {
			treeData: "=",
			nodeTpl: "=",
			nodeType: "="
		};

		this.$compile = $compile;
		
		this.tpls = {
			default: defaultNodeTpl,
			checkbox: checkboxNodeTpl
		};
	}

	link(scope, element, attrs) {
		scope.treeId = attrs["treeId"];
		
		let nodeTpl;
		
		if (scope.nodeType) {
			nodeTpl = this.tpls[scope.nodeType];
		}
		else {
			nodeTpl = defaultNodeTpl;
		}
		
		element.find("ul").html(nodeTpl);

		this.$compile(element.contents())(scope);
	}

	controller($scope) {
		$scope.$isTreeNode = true;
		
		if ($scope.treeData) {
			$scope.treeData.forEach(v => v.$checked=false);
		}

		$scope.getRoot = () => {
			let pointer = $scope;
			let parent = pointer.$parent;
			if (parent) {
				while (parent.$isTreeNode) {
					pointer = parent;
					parent = parent.$parent;
				}
			}
			return pointer;
		};

		$scope.arrowClass = node => {
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

		$scope.select = node => {
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

		$scope.itemClick = node => {
			$scope.select(node);

			node.$checked = !node.$checked;
			checkChildren(node);
			$scope.$emit("sn.controls.tree:itemChecked", {});
		};

		$scope.itemCheck = node => {
			checkChildren(node);
			$scope.$emit("sn.controls.tree:itemChecked", {});
		};

		$scope.$on("sn.controls.tree:itemChecked", e => {
			if ($scope.treeData) {
				for (let node of $scope.treeData) {
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
				}
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