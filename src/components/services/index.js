import alert from "./alert/index";
import hint from "./hint/index";

export default angular.module("components.services", [alert, hint])
	.name;