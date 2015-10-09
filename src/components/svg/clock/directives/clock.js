import template from "../templates/clock.html";

import "../css/clock.css";

export default class ClockDirective {
	constructor($timeout, $document) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			time: "="
		};

		this.$timeout = $timeout;
	}

	link(scope) {
		this.$scope = scope;
	}

	controller($scope) {
		let tick = () => {
			let date = new Date();
			$scope.seconds = date.getSeconds();
			$scope.minutes = (date.getMinutes() * 60) + $scope.seconds;
			$scope.hours = (date.getHours() * 3600) + $scope.minutes;
			
			this.$timeout(tick, 1000);
		};
		
		tick();
	}
}

ClockDirective.$inject = ["$timeout", "$document"];