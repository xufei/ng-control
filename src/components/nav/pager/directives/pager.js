import template from "../templates/pager.html";

export default class PagerDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			disabled: "=",
			count: "=",
			pageSize: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
	}

	controller($scope) {
		let pager = new Pager();

		$scope.pager = pager;

		$scope.$watch("pageSize", size => {
			if (typeof size == "number") {
				pager.pageSize = size;
			}
		});

		$scope.$watch("count", count => {
			if (typeof count == "number") {
				pager.count = count;
			}
		});

		$scope.goto = index => pager.currentPage = index;

		$scope.getText = key => PagerDirective.texts[key];
	}
}


PagerDirective.texts = {
	first: '首页',
	previous: '上一页',
	next: '下一页',
	last: '末页'
};

class Pager {
	constructor() {
		this._pageSize = 10;
		this._listSize = 5;
		this._offset = 0;
		this.currentPage = 0;
	}

	set count(val) {
		this._count = val;
		this.resetPageList();
	}

	get count() {
		return this._count;
	}

	set pageSize(val) {
		this._pageSize = val;
		this.resetPageList();
	}

	get pageSize() {
		return this._pageSize;
	}

	resetPageList() {
		if (this._count % this._pageSize == 0) {
			this.totalPages = this._count / this._pageSize;
		} else {
			this.totalPages = Math.ceil(this._count / this._pageSize);
		}

		if (this.totalPages == 0) {
			this.totalPages = 1;
		}

		var last = Math.min(this._offset + this._listSize, this.totalPages);

		this.pages = Array.from(Array(last - this._offset), (v, i) => Object.create({
			index: i + this._offset,
			active: false
		}));
	}
}