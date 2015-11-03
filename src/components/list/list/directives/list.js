import template from "../templates/list.html";

import defaultTpl from "../templates/default-item.html";

import "../css/list.css";

export default class ListDirective {
	constructor($compile) {
		this.restrict = "E";
		this.template = template;

		this.scope = {
			listData: "=",
			selectedItem: "=ngModel"
		};

		this.$compile = $compile;
	}

	link(scope, element, attrs) {
		var rowHeight = 42;

        scope.height = 200;
        scope.scrollTop = 0;
        scope.visibleProvider = [];
        scope.cellsPerPage = 0;
        scope.numberOfCells = 0;
        scope.canvasHeight = {};
		scope.style = {};

        scope.init = () => {
			element[0].addEventListener("scroll", scope.onScroll);
			scope.cellsPerPage = Math.round(scope.height / rowHeight);
			scope.numberOfCells = 3 * scope.cellsPerPage;
			scope.canvasHeight = {
				height: scope.listData.length * rowHeight + "px"
			};

			scope.updateDisplayList();
        };

        scope.updateDisplayList = () => {
			var firstCell = Math.max(Math.floor(scope.scrollTop / rowHeight) - scope.cellsPerPage, 0);
			var cellsToCreate = Math.min(firstCell + scope.numberOfCells, scope.numberOfCells);
			scope.visibleProvider = scope.listData.slice(firstCell, firstCell + cellsToCreate);

			scope.style = {
				"top": (firstCell * rowHeight) + "px"
			};
        };

        scope.onScroll = (evt) => {
			scope.scrollTop = element.prop("scrollTop");
			scope.updateDisplayList();

			scope.$apply();
        };

        scope.itemClicked = (item) => {
			scope.selectedItem = item;
        };

        scope.init();
	}

	controller($scope) {
	}
}

ListDirective.$inject = ["$compile"];