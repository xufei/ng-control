import { Calendar } from "../../../models/calendar/calendar";

export default class CalendarCtrl extends Calendar {
	constructor() {
		super();

		this.monthArr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
		this.weekdayArr = ["日", "一", "二", "三", "四", "五", "六"];
		
		// 视图模式，一个三个，可以切换，默认是显示日期的 
		this.ViewStates = Object.freeze({
			DATE: 0,
			MONTH: 1,
			YEAR: 2
		});

		this.viewMode = this.ViewStates.DATE;
		
		if ((this.initDate == null) || isNaN(this.initDate.getTime())) {
			this.currentDate = new Date();
		}
		else {
			this.currentDate = this.currentDate;
		}
	}

	dateInRange(day) {
        var date = new Date(this.year, this.month, day);
        
		if (this.minDate) {
			if (date.valueOf() - this.minDate.valueOf() < 0) {
				return false;
			}
		}
		
		if (this.maxDate) {
			if (date.valueOf() - this.maxDate.valueOf() > 0) {
				return false;
			}
		}
		return true;
	}
    
    dateIsSelected(day) {
        return new Date(this.year, this.month, day).valueOf() == this.currentDate.valueOf();
    }

	selectDate(day) {
		if (this.dateInRange(day)) {
			this.date = day;

			if (this.dateClick) {
				this.dateClick(this.currentDate);
			}
		}
	}

	selectMonth(month) {
		this.month = month;
		this.viewMode = this.ViewStates.DATE;
	}

	selectYear(year) {
		this.year = year;
		this.viewMode = this.ViewStates.DATE;
	}

	selectNow() {
		this.currentDate = new Date();
	}
}