export default class TimePickerController{
	constructor($filter, $timeout) {
		this.$filter = $filter;
		this.$timeout = $timeout;
		
		this.hours = Array.from(Array(24), (v, i) => i);
		this.minutes = Array.from(Array(60), (v, i) => i);
		this.seconds = Array.from(Array(60), (v, i) => i);
		
		
		let date = new Date();
		
		this.hour = this.hour || date.getHours();
		this.minute = this.minute || date.getMinutes();
		this.second = this.second || date.getSeconds();
	}
	
	set selectedDate(newDate) {
		if (newDate) {
			this._selectedDate = newDate;
			this.currentDateStr = this.$filter('date')(newDate, "hh:mm:ss");
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

TimePickerController.$inject = ["$filter", "$timeout"];