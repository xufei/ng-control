import { Calendar } from "../../../models/calendar/calendar";

export default class DateTimePickerController extends Calendar {
    constructor($filter, $timeout) {
        super();

        this.$filter = $filter;
        this.$timeout = $timeout;

        if ((this.initDate == null) || isNaN(this.initDate.getTime())) {
            this.currentDate = new Date();
        }
        else {
            this.selectedDate = this.currentDate = this.initDate;
            this.updateStr();
        }
    }

    get currentDate() {
        console.log(111);
        if (this.showTime) {
            return new Date(this.year, this.month, this.date, this.hour, this.minute, this.second);
        }
        else {
            return new Date(this.year, this.month, this.date);
        }
    }

    set currentDate(val) {
        console.log(val);
        if (val) {
            this.year = val.getFullYear();
            this.month = val.getMonth();
            this.date = val.getDate();

            if (this.showTime) {
                this.hour = val.getHours();
                this.minute = val.getMinutes();
                this.second = val.getSeconds();
            }
        }
    }

    updateStr() {
        if (this.showTime) {
            this.currentDateStr = this.$filter("date")(this.selectedDate, "yyyy-MM-dd HH:mm:ss");
        }
        else {
            this.currentDateStr = this.$filter("date")(this.selectedDate, "yyyy-MM-dd");
        }
    }

    showPop() {
        if (!this.disabled) {
            this.pop = true;
        }
    }

    ok() {
        this.$timeout(() => {
            this.selectedDate = this.currentDate;
            this.updateStr();
            this.pop = false;
        }, 0);
    }
    
    cancel() {
        this.$timeout(() => {
            this.selectedDate = null;;
            this.updateStr();
            this.pop = false;
        }, 0);
    }
}

DateTimePickerController.$inject = ["$filter", "$timeout"];