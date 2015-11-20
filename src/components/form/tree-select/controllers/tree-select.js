export default class TreeSelectController {
	constructor() {
		this.selectedPath = [];
		this.pop = false;
	}

	selected(item) {
		return this.selectedPath.indexOf(item) >= 0;
	}

	showPop() {
		if (this.disabled) {
			return;
		}
		this.pop = true;
	}

	select(...item) {
		this.selectedItem = item[0];
		this.pop = false;

		this.selectedPath = item;
	}
}