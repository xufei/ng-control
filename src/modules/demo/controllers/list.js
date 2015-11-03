export default class ListController {
	constructor() {
		this.dataProvider = Array.from(Array(10000), (v, i) => {return {index:i, label:"Item"+i}});
		this.selectedItem = null;
	}

    onSelect(item) {
		console.log(item);
    };
}