export default class DateTimePickerController{
	constructor($filter, $timeout) {
		this.$filter = $filter;
		this.$timeout = $timeout;
	}
	
	setDate(newDate) {
		if (newDate) {
			this.year = newDate.getFullYear();
			this.month = newDate.getMonth();
			this.day = newDate.getDay();
			
			if (this.showTime) {
				this.hour = newDate.getHours();
				this.minute = newDate.getMinutes();
				this.second = newDate.getSeconds();
			}
			
			this.updateStr(newDate);
		}
	}
	
	getDate() {
		let newDate = new Date(this.year, this.month, this.day);
		newDate.setHours(this.hour || 0);
		newDate.setMinutes(this.minute || 0);
		newDate.setSeconds(this.second || 0);
		
		this.currentDate = newDate;
		this.updateStr(newDate);
		
		return newDate;
	}
	
	updateStr(date) {
		if (this.showTime) {
			this.currentDateStr = this.$filter('date')(date, "yyyy-MM-dd hh:mm:ss");
		}
		else {
			this.currentDateStr = this.$filter('date')(date, "yyyy-MM-dd");
		}
	}

	showPop() {
		if (!this.disabled) {
			this.pop = true;
		}
	}

	dateClick() {
		this.$timeout(() => {
			this.getDate();
			this.pop = false;
		}, 0);
	};
}

DateTimePickerController.$inject = ["$filter", "$timeout"];