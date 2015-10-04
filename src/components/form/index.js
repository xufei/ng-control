import checkbox from "./checkbox/index";
import calendar from "./calendar/index";
import datepicker from "./datepicker/index";
import daterangepicker from "./date-range-picker/index";
import slider from "./slider/index";
import numberInput from "./number-input/index";
import select from "./select/index";

export default angular.module("components.form", [checkbox, calendar, datepicker, daterangepicker, slider, numberInput, select])
	.name;