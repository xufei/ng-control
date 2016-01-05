import { Calendar } from "../../../models/calendar/calendar";

export default class CalendarCtrl {
	constructor() {
		this.calendar = new Calendar();

		this.monthArr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
		this.weekdayArr = ["日", "一", "二", "三", "四", "五", "六"];
		
		// 视图模式，一个三个，可以切换，默认是显示日期的 
		this.ViewStates = Object.freeze({
			DATE: 0,
			MONTH: 1,
			YEAR: 2
		});

		this.viewMode = this.ViewStates.DATE;
	}

	dateInRange(day) {
        var date = new Date(this.calendar.year, this.calendar.month, day);
        
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
        return new Date(this.calendar.year, this.calendar.month, day).valueOf() == this.calendar.currentDate.valueOf();
    }

	selectDate(day) {
		if (this.dateInRange(day)) {
			this.day = this.calendar.date = day;

			this.selectedDate = new Date(this.calendar.year, this.calendar.month, this.calendar.date);

			if (this.dateClick) {
				this.dateClick(this.calendar.selectedDate);
			}
		}
	}

	selectMonth(month) {
		this.month = this.calendar.month = month;
		this.viewMode = this.ViewStates.DATE;

		this.selectedDate = new Date(this.calendar.year, this.calendar.month, this.calendar.date);
	}

	selectYear(year) {
		this.year = this.calendar.year = year;
		this.viewMode = this.ViewStates.DATE;

		this.selectedDate = new Date(this.calendar.year, this.calendar.month, this.calendar.date);
	}

	selectNow() {
		this.calendar.currentDate = new Date();
	}
}