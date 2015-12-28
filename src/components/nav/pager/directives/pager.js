import template from "../templates/pager.html";

import PagerController from "../controllers/pager";

export default class PagerDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";
		this.controller = PagerController;
		this.controllerAs = "pagerCtrl";
		this.bindToController = true;

		this.scope = {
			disabled: "=",
			count: "=",
			pageSize: "=",
			currentIndex: "="
		};
	}

	link(scope, element, attrs) {
		scope.$watch("pagerCtrl.pageSize", size => {
			if (typeof size == "number") {
				scope.pagerCtrl.pageSize = size;
				scope.pagerCtrl.resetPageList();
			}
		});

		scope.$watch("pagerCtrl.count", count => {
			if (typeof count == "number") {
				scope.pagerCtrl.count = count;
				scope.pagerCtrl.resetPageList();
			}
		});
		
		scope.$watch("pageCtrl.currentIndex", index => {
			if (typeof index == "number") {
				scope.pageCtrl.goto(index);
			}
		});
	}
}