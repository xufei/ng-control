angular.module("sn.controls").directive('tree', ["Tree", function(Tree) {
	return {
		restrict : 'E',
		transclude : true,
		scope : {},
		link : function(scope, element, attrs, ctrls) {
			var tree = new Tree(element);
			tree.labelField = attrs["labelfield"];
			tree.loadTreeData(scope.$parent.$eval(attrs.treedata), attrs["keyfield"]);
		}
	};
}]).constant('treeConfig', {
}).factory("Tree", ["Events", function(Events) {
	var $ = angular.element;
	
	var Tree = function(element) {
		this.allNodes = [];
		this.childNodes = [];

		this.keyField = null;
		this.nodeDict = {};
		this.data = null;

		this.selectedNode = null;

		this.tree = this;
		this.labelField = null;

		this.childrenContainer = $("<ul></ul>").addClass("tree");
		element.append(this.childrenContainer);
	};

	Tree.prototype = angular.extend({
		loadTreeData : function(data, keyField) {
			this.clear();

			this.keyField = keyField;

			for (var i = 0; i < data.length; i++) {
				this.addNode(data[i]);
			}
			this.data = data;
		},

		loadListData : function(data, selfField, parentField, topFlag) {
			var tree = [];
			var dict = {};

			var length = data.length;
			for (var i = 0; i < length; i++) {
				var item = data[i];
				dict[item[selfField]] = item;
				if (item[parentField] === topFlag) {
					//add root nodes
					tree.push(item);
				}
			}

			//contribute the tree data
			for ( i = 0; i < length; i++) {
				var child = data[i];
				if (child[parentField] === topFlag) {
					continue;
				}
				var parent = dict[child[parentField]];
				if (parent) {
					child.parent = parent;
					if (!parent.children) {
						parent.children = [];
					}
					parent.children.push(child);

				}
			}

			this.loadTreeData(tree, selfField);
		},

		expandAll : function() {
			for (var i = 0; i < this.allNodes.length; i++) {
				this.allNodes[i].expand();
			}
		},

		collapseAll : function() {
			for (var i = 0; i < this.allNodes.length; i++) {
				this.allNodes[i].collapse();
			}
		},

		findNode : function(key, value) {
			var result;
			for (var i = 0; i < this.allNodes.length; i++) {
				var node = this.allNodes[i];
				if (node[key] === value) {
					result = node;
					break;
				}
			}

			return result;
		},

		addNode : function(data, parent) {
			parent = parent || this;

			var node = new TreeNode(data, parent);
			parent.childNodes.push(node);
			parent.childrenContainer.append(node.dom);

			this.allNodes.push(node);

			var that = this;
			node.on("selected", function(event) {
				that.selectNode(event.node);
			});

			node.on("expanded", function(event) {
				if (event.node.expanded) {
					event.node.collapse();
				} else {
					event.node.expand();
				}
			});

			node.on("rightClicked", function(event) {
				//只做转发，把主体改变一下
				event.target = that;
				that.fire(event);
			});

			node.refreshIcon();

			//已经成功添加了新节点
			var event = {
				type : "nodeAdded",
				newNode : node,
				target : this
			};
			this.fire(event);
		},

		removeNode : function(node) {
			node.clear();

			if (node == this.selectedNode) {
				this.selectNode(null);
			}

			if (node.parent == this) {
				this.childrenContainer.remove(node.dom);

				for (var i = 0; i < this.nodes.length; i++) {
					if (this.nodes[i] == node) {
						this.nodes.splice(i, 1);
						break;
					}
				}
			} else {
				node.parent.childrenContainer.remove(node.dom);
				for (var i = 0; i < node.parent.childNodes.length; i++) {
					if (node.parent.childNodes[i] == node) {
						node.parent.childNodes.splice(i, 1);
						break;
					}
				}
			}

			node.destroy();

			for (var i = 0; i < this.allNodes.length; i++) {
				if (this.allNodes[i] == node) {
					this.allNodes.splice(i, 1);
					break;
				}
			}

			//已经移除
			var event = {
				type : "nodeRemoved",
				target : this
			};
			this.fire(event);
		},

		swapNodes : function(node1, node2) {

		},

		selectNode : function(node) {
			var event = {
				type : "changed",
				oldNode : this.selectedNode,
				newNode : node
			};

			if (this.selectedNode) {
				this.selectedNode.select(false);
			}

			if (node) {
				node.select(true);
			}

			this.selectedNode = node;

			this.fire(event);
		},

		clear : function() {

		},

		destroy : function() {

		}
	}, Events);

	var TreeNode = function(data, parent) {
		this.data = data;
		this.parent = parent;
		this.tree = parent.tree;
		this.childNodes = [];

		this.create();
	};

	TreeNode.prototype = angular.extend({
		create : function() {
			this.dom = $("<li></li>");
			this.iconContainer = $("<span></span>").addClass("glyphicon");
			this.labelContainer = $("<span></span>").html(this.data[this.tree.labelField || "label"]);
			this.childrenContainer = $("<ul></ul>");
			
			this.dom.append(this.iconContainer);
			this.dom.append(this.labelContainer);
			this.dom.append(this.childrenContainer);

			if (this.data.children) {
				for (var i = 0; i < this.data.children.length; i++) {
					this.addNode(this.data.children[i]);
				}
			}

			this.expanded = true;

			bindEvent(this);

			function bindEvent(node) {
				//expand
				node.iconContainer.on("click", function() {
					var event = {
						type : "expanded",
						expanded : node.expanded,
						node : node,
						target : node
					};

					node.fire(event);
				});

				//select
				node.labelContainer.on("click", function() {
					var event = {
						type : "selected",
						node : node,
						target : node
					};

					node.fire(event);
				});

				//contextmenu
				node.dom.oncontextmenu = function(e) {
					var event = {
						type : "rightClicked",
						node : node,
						target : node
					};

					node.fire(event);

					if (e && e.stopPropagation)
						//因此它支持W3C的stopPropagation()方法
						e.stopPropagation();
					else
						//否则，我们需要使用IE的方式来取消事件冒泡
						window.event.cancelBubble = true;

					//阻止默认浏览器动作(W3C)
					if (e && e.preventDefault)
						e.preventDefault();
					//IE中阻止函数器默认动作的方式
					else
						window.event.returnValue = false;
					return false;
				}
			}

		},

		clear : function() {
			while (this.childNodes.length > 0) {
				this.removeNode(this.childNodes[0]);
			}
		},

		destroy : function() {
			this.data = null;
			this.parent = null;
			this.tree = null;
			this.childNodes = null;

			this.iconContainer = null;
			this.labelContainer = null;
			this.childrenContainer = null;
			this.dom = null;
		},

		addNode : function(data) {
			this.tree.addNode(data, this);
		},

		removeNode : function(node) {
			this.childrenContainer.remove(node.dom);

			for (var i = 0; i < this.childNodes.length; i++) {
				if (this.childNodes[i] == node) {
					this.childNodes.splice(i, 1);
				}
			}

			for (var i = 0; i < this.tree.allNodes.length; i++) {
				if (this.tree.allNodes[i] == node) {
					this.tree.allNodes.splice(i, 1);
				}
			}
		},

		expand : function() {
			this.childrenContainer.css("display", "");
			this.expanded = true;
			this.refreshIcon();
		},

		collapse : function() {
			this.childrenContainer.css("display", "none");
			this.expanded = false;
			this.refreshIcon();
		},

		select : function(flag) {
			if (flag) {
				this.dom.className = "info";
			} else {
				this.dom.className = "";
			}
		},

		refreshData : function(data) {
			this.labelContainer.html(data[this.tree.labelField || "label"]);
		},

		refreshIcon : function() {
			if (this.expanded) {
				this.iconContainer.removeClass("glyphicon-folder-open").addClass("glyphicon-folder-close");
			} else {
				this.iconContainer.removeClass("glyphicon-folder-close").addClass("glyphicon-folder-open");
			}
		}
	}, Events);

	return Tree;
}]); 