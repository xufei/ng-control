import checkbox from "./checkbox/index";
import calendar from "./calendar/index";
import timePicker from "./timepicker/index";
import datetimePicker from "./datetime-picker/index";
import dateRangePicker from "./date-range-picker/index";
import slider from "./slider/index";
import numberInput from "./number-input/index";
import select from "./select/index";
import multiSelect from "./multi-select/index";
import treeselect from "./tree-select/index";

export default angular.module("components.form", [checkbox, calendar, timePicker, datetimePicker, dateRangePicker, slider, numberInput, select, multiSelect, treeselect])
	.name;