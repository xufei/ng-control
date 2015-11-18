export default class DataGridController {
	headerSort(key) {
		this.desc = !this.desc;
		
		if (this.desc) {
			this.data.sort((a, b) => a[key] - b[key]);
		}
		else {
			this.data.sort((a, b) => b[key] - a[key]);
		}
	}
	
	checkAll() {
		this.data.forEach(it => it.$checked = this.$allChecked);
	}

	checkItem(item) {
		this.$allChecked = this.data.every(it => it.$checked);
	}
}