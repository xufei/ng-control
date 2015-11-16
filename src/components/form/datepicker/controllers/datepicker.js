export default class DatePickerController{
	constructor($filter, $timeout) {
		this.$filter = $filter;
		this.$timeout = $timeout;
	}
	
	set currentDate(newDate) {
		if (newDate) {
			this.selectedDate = newDate;
			this.currentDateStr = this.$filter('date')(newDate, "yyyy-MM-dd");
		}
	}

	showPop() {
		if (!this.disabled) {
			this.pop = true;
		}
	}

	dateClick() {
		this.$timeout(() => this.currentDate = this.selectedDate, 0);
		this.pop = false;
	};
}

DatePickerController.$inject = ["$filter", "$timeout"];