export default class DateController {
	constructor() {
		this.oneDay = new Date(2012, 3, 9);
		
		this.year = this.oneDay.getFullYear();
		this.month = this.oneDay.getMonth();
		this.date = this.oneDay.getDate();

		this.min = new Date(2015, 8, 3);
		this.max = new Date(2016, 2, 1);
		
		this.fromDate = new Date(1995, 1, 3);
		this.toDate = new Date(2016, 7, 6);
	}
	
	click() {
		alert(1111);
	}
}