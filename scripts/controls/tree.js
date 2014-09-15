angular.module("sn.controls").directive('snTree', function($compile) {
	return {
		restrict : "E",
		scope : {
			treeData : "="
		},
		controller: function($scope) {
			$scope.$isTreeNode = true;
			
			$scope.getRoot = function() {
				var pointer = this;
				var parent = pointer.$parent;
				while (parent.$isTreeNode) {
					pointer = parent;
					parent = parent.$parent;
				}
				
				return pointer;
			};
			
			$scope.type = function(node) {
				if (node.children && node.children.length > 0) {
					if (node.$collapsed) {
						return "collapsed";
					}
					else {
						return "expanded";
					}
				}
				else {
					return "normal";
				}
			};
			
			$scope.select = function(node) {
				if (node != $scope.selectedNode) {
					var root = $scope.getRoot();
					if (root.selectedNode) {
						root.selectedNode.$selected = false;
					}
					node.$selected = true;
					
					root.selectedNode = node;

					var evt = {newNode:node, oldNode:$scope.selectedNode, treeId: root.treeId};
					
					root.$emit("sn.controls.tree:selectedNodeChanged", evt);
				}
			};
			
			$scope.itemClick = function(node) {
				this.select(node);
			};
			
			$scope.iconClick = function(node) {
				node.$collapsed = !node.$collapsed;
				
				var evt = {currentNode: node};
				var root = $scope.getRoot();
				root.$emit("sn.controls.tree:nodeIconClicked", evt);
			};
		},
		templateUrl : 'templates/tree/tree.html',
		compile : function(tElement, tAttr) {
			var contents = tElement.contents().remove();
			var compiledContents;
			return function(scope, iElement, iAttr) {
				if (!compiledContents) {
					compiledContents = $compile(contents);
				}

				scope.treeId = iAttr["treeId"];

				compiledContents(scope, function(clone, scope) {
					iElement.append(clone);
				});
			};
		}
	};
});