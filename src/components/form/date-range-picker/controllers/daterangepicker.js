export default class DateRangePickerController {
	constructor($filter) {
		this.$filter = $filter;
        
        if ((this.initFromDate == null) || isNaN(this.initFromDate.getTime())) {
            this.fromDate = new Date();
        }
        else {
            this.fromDate = this.initFromDate;
            this.updateStr();
        }
	}
	
	updateStr (fromDate, toDate) {
		this.currentDateStr = this.$filter('date')(fromDate || "未选择开始日期", "yyyy-MM-dd")
			+ " 至 " + this.$filter('date')(toDate || "未选择结束日期", "yyyy-MM-dd");
	}

	showPop() {
		if (!this.disabled) {
			this.pop = true;
		}
	}

	fromDateClick() {
		this.fromDate = new Date(this.fromYear, this.fromMonth, this.fromDay);
	}
	
	toDateClick ()  {
		this.toDate = new Date(this.toYear, this.toMonth, this.toDay);
	}

    get fromDate() {
        if (this.showTime) {
            return new Date(this.year, this.month, this.date, this.hour, this.minute, this.second);
        }
        else {
            return new Date(this.year, this.month, this.date);
        }
    }

    set fromDate(val) {
        if (val) {
            this.fromYear = val.getFullYear();
            this.fromMonth = val.getMonth();
            this.fromDay = val.getDate();
        }
    }
    
    get toDate() {
        if (this.showTime) {
            return new Date(this.year, this.month, this.date, this.hour, this.minute, this.second);
        }
        else {
            return new Date(this.year, this.month, this.date);
        }
    }

    set toDate(val) {
        if (val) {
            this.toYear = val.getFullYear();
            this.toMonth = val.getMonth();
            this.toDay = val.getDate();
        }
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