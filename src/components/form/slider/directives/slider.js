import template from "../templates/slider.html";

export default class SliderDirective {
	constructor($document) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			value: "=ngModel",
			min: "=",
			max: "=",
			disabled: "="
		};

		this.$document = $document;
	}

	link($scope, element, attrs) {
		this.$scope = $scope;

		if (!$scope.max) {
			$scope.max = 100;
		}

		if (!$scope.min) {
			$scope.min = 0;
		}

		this.$document.on("keypress", function (evt) {
			if ($scope.disabled) {
				return;
			}

			if ((evt.keyCode || evt.which) == "45") {
				$scope.decrease();
				$scope.$digest();
			}
			else if ((evt.keyCode || evt.which) == "61") {
				$scope.increase();
				$scope.$digest();
			}
		});

		$scope.mousedown = function() {
			if ($scope.disabled) {
				return;
			}

			$scope.dragging = true;
		};

		$scope.trackClick = function(evt) {
			if ($scope.disabled) {
				return;
			}

			var allWidth = evt.currentTarget.offsetWidth;
			var currentWidth = (evt.offsetX || evt.layerX);

			$scope.changeValue(Math.round($scope.max * currentWidth / allWidth));
		};

		this.$document.on("mousemove", function (evt) {
			if ($scope.disabled) {
				return;
			}

			if ($scope.dragging) {
				var allWidth = element.children()[0].offsetWidth;
				var currentWidth = evt.clientX - offset(element.find("div")[1]).x;

				$scope.changeValue(Math.round($scope.max * currentWidth / allWidth));
				$scope.$digest();
			}
		});

		this.$document.on("mouseup", function () {
			if ($scope.disabled) {
				return;
			}

			$scope.dragging = false;
			$scope.$digest();
		});

		function offset(element) {
			var x = 0;
			var y = 0;

			while (element.offsetParent) {
				x += element.offsetLeft;
				y += element.offsetTop;

				element = element.offsetParent;
			}

			return {x: x, y: y};
		}
	}

	controller($scope) {
		$scope.increase = function () {
			$scope.changeValue($scope.value + 1);
		};

		$scope.decrease = function () {
			$scope.changeValue($scope.value - 1);
		};

		$scope.valueInRange = function(value) {
			if (!value) {
				return true;
			}

			if (value - $scope.min < 0) {
				return false;
			}

			if (value - $scope.max > 0) {
				return false;
			}
			return true;
		};

		$scope.changeValue = function (value) {
			if (this.valueInRange(value)) {
				$scope.value = value;
			}
		};
	}
}

SliderDirective.$inject = ["$document"];