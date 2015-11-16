import alert from "./alert/index";
import hint from "./hint/index";
import dialog from "./dialog/index";

import eventbus from "./eventbus/index";

export default angular.module("components.services", [alert, hint, dialog, eventbus])
	.name;