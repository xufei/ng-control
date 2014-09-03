angular.module("sn.controls").directive("snTimepicker", [function () {
	return {
		restrict: "E",
		scope: {},
		controller: function ($scope) {
			$scope.viewMode = 3;

			$scope.hours = [];
			$scope.minutes = [];
			$scope.seconds = [];

			for (var i = 0; i < 24; i++) {
				$scope.hours.push(i);
			}

			for (var j = 0; j < 60; j++) {
				$scope.minutes.push(j);
			}

			for (var k = 0; k < 60; k++) {
				$scope.seconds.push(k);
			}

			function init() {
				var now = new Date();
				$scope.currentHour = $scope.currentHour || now.getHours();
				$scope.currentMinute = $scope.currentMinute || now.getMinutes();
				$scope.currentSecond = $scope.currentSecond || now.getSeconds();
			}

			init();

			$scope.$watch("currentHour", function (newHour, oldHour) {
				if (newHour != oldHour) {
					$scope.$emit("sn.controls.timePicker:hourChanged", newHour);
				}
			});

			$scope.$watch("currentMinute", function (newMinute, oldMinute) {
				if (newMinute != oldMinute) {
					$scope.$emit("sn.controls.timePicker:minuteChanged", newMinute);
				}
			});

			$scope.$watch("currentSecond", function (newSecond, oldSecond) {
				if (newSecond != oldSecond) {
					$scope.$emit("sn.controls.timePicker:secondChanged", newSecond);
				}
			});

			$scope.hourClass = function (hour) {
				if ($scope.currentHour == hour) {
					return "active hour";
				}
				else {
					return "hour";
				}
			};

			$scope.minuteClass = function (minute) {
				if ($scope.currentMinute == minute) {
					return "active minute";
				}
				else {
					return "minute";
				}
			};

			$scope.secondClass = function (second) {
				if ($scope.currentSecond == second) {
					return "active second";
				}
				else {
					return "second";
				}
			};

			$scope.selectHour = function (hour) {
				$scope.currentHour = hour;
				$scope.switchView(3);
			};

			$scope.selectMinute = function (minute) {
				$scope.currentMinute = minute;
				$scope.switchView(3);
			};

			$scope.selectSecond = function (second) {
				$scope.currentSecond = second;
				$scope.switchView(3);
			};

			$scope.increaseHour = function () {
				$scope.currentHour = ($scope.currentHour + 1) % 24;
			};

			$scope.decreaseHour = function () {
				$scope.currentHour = ($scope.currentHour + 23) % 24;
			};

			$scope.increaseMinute = function () {
				$scope.currentMinute = ($scope.currentMinute + 1) % 60;
			};

			$scope.decreaseMinute = function () {
				$scope.currentMinute = ($scope.currentMinute + 59) % 60;
			};

			$scope.increaseSecond = function () {
				$scope.currentSecond = ($scope.currentSecond + 1) % 60;
			};

			$scope.decreaseSecond = function () {
				$scope.currentSecond = ($scope.currentSecond + 59) % 60;
			};

			$scope.switchView = function (view) {
				//0：整体视图；1：时；2：分；3：秒
				$scope.viewMode = view;
			};
		},
		link: function (scope, element, attrs) {
			if (attrs["initHour"]) {
				scope.currentHour = scope.$parent.$eval(attrs["initHour"]);
			}

			if (attrs["initMinute"]) {
				scope.currentMinute = scope.$parent.$eval(attrs["initMinute"]);
			}

			if (attrs["initSecond"]) {
				scope.currentSecond = scope.$parent.$eval(attrs["initSecond"]);
			}
		},
		templateUrl: "templates/timepicker/timepicker.html"
	}
}]);