import { Calendar } from "../../../models/calendar/calendar";

export default class DateTimePickerController extends Calendar {
	constructor($filter, $timeout) {
		super();
		
		this.$filter = $filter;
		this.$timeout = $timeout;
		
		if ((this.selectedDate == null) || isNaN(this.selectedDate.getTime())) {
			this.currentDate = new Date();
		}
		else {
			this.currentDate = this.selectedDate;
		}
		this.updateStr();
	}
	
	updateStr() {
		if (this.showTime) {
			this.currentDateStr = this.$filter('date')(this.currentDate, "yyyy-MM-dd hh:mm:ss");
		}
		else {
			this.currentDateStr = this.$filter('date')(this.currentDate, "yyyy-MM-dd");
		}
	}

	showPop() {
		if (!this.disabled) {
			this.pop = true;
		}
	}

	dateClick() {
		this.$timeout(() => {
			this.updateStr();
			this.selectedDate = this.currentDate;
			this.pop = false;
		}, 0);
	};
}

DateTimePickerController.$inject = ["$filter", "$timeout"];