export default class SelectController {
	constructor() {
		this.pop = false;
	}

	showPop() {
		if (this.disabled) {
			return;
		}
		this.pop = true;
	}

	select(item) {
		this.selectedItem = item;
		this.pop = false;
	}
}