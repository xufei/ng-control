export default class PagerController {
	constructor() {
		this.texts = {
			first: '首页',
			previous: '上一页',
			next: '下一页',
			last: '末页'
		};

		this.pages = [];
		this.pageSize = 10;
		this.listSize = 5;
		this.offset = 0;
		this.currentPage = 0;
	}

	first() {
		this.goto(0);
	}

	last() {
		this.goto(this.totalPages - 1);
	}

	previous() {
		if (this.currentPage) {
			this.goto(this.currentPage.index - 1);
		}
	}

	next() {
		if (this.currentPage) {
			this.goto(this.currentPage.index + 1);
		}
	}

	isFirst() {
		return this.currentPage && this.currentPage.index == 0;
	}

	isLast() {
		console.log(this.currentPage.index);
		return this.currentPage && this.currentPage.index == this.totalPages - 1;
	}

	rangeOffset(index) {
		this.offset = Math.min(index, this.totalPages - this.listSize);
		let last = Math.min(this.offset + this.listSize, this.totalPages);

		this.pages = Array.from(Array(last - this.offset), (v, i) => {
			return {
				index: i + this.offset,
				active: false
			};
		});
	}

	goto(index) {
		if ((index < 0) || (index > this.totalPages - 1)) {
			return;
		}

		if ((index < this.offset) || (index >= this.offset + this.listSize)) {
			this.currentPage = null;
			this.rangeOffset(index);
		}
		else if (this.currentPage) {
			this.currentPage.active = false;
		}
		
		this.currentPage = this.pages[index - this.offset];
		this.currentPage.active = true;
	}

	getText(key) {
		return this.texts[key];
	}

	resetPageList() {
		if (this.count % this.pageSize == 0) {
			this.totalPages = this.count / this.pageSize;
		} else {
			this.totalPages = Math.ceil(this.count / this.pageSize);
		}

		if (this.totalPages == 0) {
			this.totalPages = 1;
		}

		this.rangeOffset(0);
	}
}