import checkbox from "./checkbox/index";
import calendar from "./calendar/index";
import datePicker from "./datepicker/index";
import timePicker from "./timepicker/index";
import dateRangePicker from "./date-range-picker/index";
import slider from "./slider/index";
import numberInput from "./number-input/index";
import select from "./select/index";
import multiSelect from "./multi-select/index";

export default angular.module("components.form", [checkbox, calendar, datePicker, timePicker, dateRangePicker, slider, numberInput, select, multiSelect])
	.name;