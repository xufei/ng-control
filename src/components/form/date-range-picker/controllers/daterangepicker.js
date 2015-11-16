export default class DateRangePickerController {
	constructor($filter) {
		this.$filter = $filter;
	}
	
	set fromDate(fromDate) {
		this._fromDate = fromDate;
		this.changeDates(fromDate, this._toDate);
	}
	
	set toDate(toDate) {
		this._toDate = toDate;
		this.changeDates(this._fromDate, toDate);
	}
	
	changeDates (fromDate, toDate) {
		this.currentDateStr = this.$filter('date')(fromDate || "未选择开始日期", "yyyy-MM-dd")
			+ " 至 " + this.$filter('date')(toDate || "未选择结束日期", "yyyy-MM-dd");
	}

	showPop() {
		if (!this.disabled) {
			this.pop = true;
		}
	}

	fromDateClick() {
		
	}
	
	toDateClick ()  {
		
	}
	
	severalMonthBefore(x) {
		let now = new Date();
		
		let year = now.getFullYear();
		let month = now.getMonth();
		let day = now.getDate();
		
		let fromDate = new Date(year, month-x, day);
		if (fromDate.getDate() != day) {
			fromDate = new Date(year, month-x+1, 0);
		}
		
		this.toDate = now;
		this.fromDate = fromDate;
		this.pop = false;
	}
	
	lastMonth () {
		this.severalMonthBefore(1);
	}
	
	lastQuarter() {
		this.severalMonthBefore(3);
	}
	
	lastHalfYear () {
		this.severalMonthBefore(6);
	}
}

DateRangePickerController.$inject = ["$filter"];