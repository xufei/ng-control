import template from "../templates/list.html";

import defaultTpl from "../templates/default-item.html";

import "../css/list.css";

export default class ListDirective {
	constructor($compile) {
		this.restrict = "E";
		this.template = template;

		this.scope = {
			uiDataProvider: '=',
			uiOnSelect: '&'
		};

		this.$compile = $compile;
	}

	link(scope, element, attrs, ngModelCtrl) {
		var rowHeight = 30;

        scope.height = 200;
        scope.scrollTop = 0;
        scope.visibleProvider = [];
        scope.cellsPerPage = 0;
        scope.numberOfCells = 0;
        scope.canvasHeight = {};

        scope.init = () => {
			element[0].addEventListener('scroll', scope.onScroll);
			scope.cellsPerPage = Math.round(scope.height / rowHeight);
			scope.numberOfCells = 3 * scope.cellsPerPage;
			scope.canvasHeight = {
				height: scope.uiDataProvider.length * rowHeight + 'px'
			};

			scope.updateDisplayList();
        };

        scope.updateDisplayList = () => {
			var firstCell = Math.max(Math.floor(scope.scrollTop / rowHeight) - scope.cellsPerPage, 0);
			var cellsToCreate = Math.min(firstCell + scope.numberOfCells, scope.numberOfCells);
			scope.visibleProvider = scope.uiDataProvider.slice(firstCell, firstCell + cellsToCreate);

			for (var i = 0; i < scope.visibleProvider.length; i++) {
				scope.visibleProvider[i].styles = {
					'top': ((firstCell + i) * rowHeight) + "px"
				}
			}
        };

        scope.onScroll = (evt) => {
			scope.scrollTop = element.prop('scrollTop');
			scope.updateDisplayList();

			scope.$apply();
        };

        scope.onClickOption = (option) => {
			ngModelCtrl.$setViewValue(option);
			scope.currentOption = option;
			scope.uiOnSelect({ "option": option });
        };

        scope.init();
	}

	controller($scope) {
	}
}

ListDirective.$inject = ["$compile"];