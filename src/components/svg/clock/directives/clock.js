import template from "../templates/clock.html";

import "../css/clock.css";

export default class ClockDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";
		
		this.controller = ClockController;
		this.controllerAs = "clockCtrl";

		this.scope = {
			time: "="
		};
	}
}

class ClockController {
	constructor($timeout) {
		let tick = () => {
			let date = new Date();
			this.seconds = date.getSeconds();
			this.minutes = (date.getMinutes() * 60) + this.seconds;
			this.hours = (date.getHours() * 3600) + this.minutes;
			
			$timeout(tick, 1000);
		};
		
		tick();
	}
}

ClockController.$inject = ["$timeout"];