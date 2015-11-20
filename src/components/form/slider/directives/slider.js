import template from "../templates/slider.html";

import SliderController from "../controllers/slider";

import { UIHelper } from "../../../utils/ui-helper";

import "../css/slider.css";

export default class SliderDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.controller = SliderController;
		this.controllerAs = "sliderCtrl";
		this.bindToController = true;

		this.scope = {
			value: "=ngModel",
			min: "=",
			max: "=",
			disabled: "="
		};
	}

	link(scope, element, attrs) {
		if (!scope.sliderCtrl.max) {
			scope.sliderCtrl.max = 100;
		}

		if (!scope.sliderCtrl.min) {
			scope.sliderCtrl.min = 0;
		}

        let keypressEvent = UIHelper.listen(window, 'click', (evt) => {
			if (scope.sliderCtrl.disabled) {
				return;
			}

			if ((evt.keyCode || evt.which) == "45") {
				scope.sliderCtrl.decrease();
				scope.$digest();
			}
			else if ((evt.keyCode || evt.which) == "61") {
				scope.sliderCtrl.increase();
				scope.$digest();
			}
		});

        let mousemoveEvent = UIHelper.listen(window, 'click', (evt) => {
			if (scope.sliderCtrl.disabled) {
				return;
			}

			if (scope.dragging) {
				var allWidth = element.children()[0].offsetWidth;
				var currentWidth = evt.clientX - UIHelper.getOffset(element.find("div")[1]).x;

				scope.sliderCtrl.changeValue(Math.round(scope.sliderCtrl.max * currentWidth / allWidth));
				scope.$digest();
			}
		});

        let mouseupEvent = UIHelper.listen(window, 'click', (evt) => {
			if (scope.sliderCtrl.disabled) {
				return;
			}

			scope.dragging = false;
			scope.$digest();
		});

		scope.$on('$destroy', () => {
			keypressEvent.remove();
			mousemoveEvent.remove();
			mouseupEvent.remove();
		});
	}
}