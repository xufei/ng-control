export default class MultiSelectController {
	showPop() {
		if (this.disabled) {
			return;
		}
		this.pop = true;
	}

	select(item) {
		item.$checked = !item.$checked;

		this.selectedItems = this.options.filter(v => v.$checked);
	}

	selectedItemsStr() {
		return this.selectedItems.reduce((last, current) => last + current.name + ";", "");
	}
}