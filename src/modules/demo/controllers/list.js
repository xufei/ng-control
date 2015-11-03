export default class ListController {
	constructor() {
		this.listData = Array.from(Array(10000), (v, i) => {return {index:i, label:"Item"+i}});
		this.selectedItem = null;
	}
}