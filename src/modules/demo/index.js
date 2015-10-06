"use strict";

import AlertController from "./controllers/alert";
import HintController from "./controllers/hint";
import {DialogController, TestDialogController} from "./controllers/dialog";

import CheckboxController from "./controllers/checkbox";
import NumberController from "./controllers/number";
import DateController from "./controllers/date";
import SelectController from "./controllers/select";
import TreeController from "./controllers/tree";

export default angular.module("modules.demo", [])
	.controller("AlertController", AlertController)
	.controller("HintController", HintController)
	.controller("DialogController", DialogController)
	.controller("TestDialogController", TestDialogController)
	.controller("CheckboxController", CheckboxController)
	.controller("NumberController", NumberController)
	.controller("DateController", DateController)
	.controller("SelectController", SelectController)
	.controller("TreeController", TreeController)
	.name;