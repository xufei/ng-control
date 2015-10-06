import alert from "./alert/index";
import hint from "./hint/index";
import dialog from "./dialog/index";

export default angular.module("components.services", [alert, hint, dialog])
	.name;