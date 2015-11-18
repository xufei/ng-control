export default class DatePickerController{
	constructor($filter, $timeout) {
		this.$filter = $filter;
		this.$timeout = $timeout;
	}
	
	set selectedDate(newDate) {
		if (newDate) {
			this._selectedDate = newDate;
			this.currentDateStr = this.$filter('date')(newDate, "yyyy-MM-dd");
		}
	}
	
	get selectedDate() {
		return this._selectedDate;
	}

	showPop() {
		if (!this.disabled) {
			this.pop = true;
		}
	}

	dateClick() {
		this.$timeout(() => {
			this.currentDate = this.selectedDate;
			this.pop = false;
		}, 0);
	};
}

DatePickerController.$inject = ["$filter", "$timeout"];