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
        scope.visibleProvider = [];
        scope.canvasHeight = {};
		scope.style = {};
		
		var rowHeight = 42;
        var height = 200;
        var scrollTop = 0;
        var cellsPerPage = 0;
        var numberOfCells = 0;

        scope.init = () => {
			element[0].addEventListener("scroll", (evt) => {
				scrollTop = element.prop("scrollTop");
				scope.updateDisplayList();
	
				scope.$apply();
			});
			
			cellsPerPage = Math.round(height / rowHeight);
			numberOfCells = 3 * cellsPerPage;
			scope.canvasHeight = {
				height: scope.listData.length * rowHeight + "px"
			};

			scope.updateDisplayList();
        };

        scope.updateDisplayList = () => {
			let firstCell = Math.max(Math.floor(scrollTop / rowHeight) - cellsPerPage, 0);
			let cellsToCreate = Math.min(firstCell + numberOfCells, numberOfCells);
			scope.visibleProvider = scope.listData.slice(firstCell, firstCell + cellsToCreate);

			scope.style = {
				"top": (firstCell * rowHeight) + "px"
			};
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