angular.module("sn.controls").directive("snDatetimepicker", ["$document", "$filter", function ($document, $filter) {
	return {
		restrict: "E",
		scope: {},
		link: function (scope, element, attrs) {
			scope.placeholder = attrs["placeholder"] || "请选择日期";

			if (attrs["ngModel"]) {
				scope.$modelKey = attrs["ngModel"];
				resetDate(scope.$parent.$eval(attrs["ngModel"]));

				scope.$parent.$watch(attrs["ngModel"], function(newValue, oldValue) {
					if (newValue) {
						resetDate(scope.$parent.$eval(newValue));
					}
				});
			}

			function resetDate(date) {
				if (date) {
					scope.currentDate = date;
					scope.currentDateStr = $filter('date')(date, "yyyy-MM-dd HH:mm:ss");
				}
			}

			var date = scope.currentDate || (new Date());
			scope.initYear = date.getFullYear();
			scope.initMonth = date.getMonth();
			scope.initDate = date.getDate();
			scope.initHour = date.getHours();
			scope.initMinute = date.getMinutes();
			scope.initSecond = date.getSeconds();

			$document.on("click", function (evt) {
				var src = evt.srcElement ? evt.srcElement : evt.target;
				if ((scope.pop) && (!element[0].contains(src))) {
					scope.pop = false;

					if (scope.$modelKey) {
						scope.$parent[scope.$modelKey] = scope.currentDate;
					}
					scope.$digest();
				}
			});
		},
		controller: function ($scope) {
			$scope.datetimepickerClass = function () {
				if ($scope.pop) {
					return "input-group date open";
				}
				else {
					return "input-group date";
				}
			};

			var initialized = false;
			$scope.showPop = function() {
				if (!initialized) {
					if (!$scope.currentDate) {
						buildDate();
					}
				}
				$scope.pop = true;
				initialized = true;
			};

			function buildDate() {
				var now = new Date();
				$scope.year = $scope.year || now.getFullYear();
				$scope.month = $scope.month || now.getMonth();
				$scope.date = $scope.date || now.getDate();
				$scope.hour = $scope.hour || now.getHours();
				$scope.minute = $scope.minute || now.getMinutes();
				$scope.second = $scope.second || now.getSeconds();

				$scope.currentDate = new Date(
					$scope.year,
					$scope.month,
					$scope.date,
					$scope.hour,
					$scope.minute,
					$scope.second
				);
				$scope.currentDateStr = $filter('date')($scope.currentDate, "yyyy-MM-dd HH:mm:ss");

				if ($scope.$modelKey) {
					$scope.$parent[$scope.$modelKey] = $scope.currentDate;
				}
			}

			$scope.$on("sn.controls.calendar:yearChanged", function (evt, year) {
				$scope.year = year;
				buildDate();
				evt.stopPropagation();
			});

			$scope.$on("sn.controls.calendar:monthChanged", function (evt, month) {
				$scope.month = month;
				buildDate();
				evt.stopPropagation();
			});

			$scope.$on("sn.controls.calendar:dateChanged", function (evt, date) {
				$scope.date = date;
				buildDate();
				evt.stopPropagation();
			});

			$scope.$on("sn.controls.timePicker:hourChanged", function (evt, hour) {
				$scope.hour = hour;
				buildDate();
				evt.stopPropagation();
			});

			$scope.$on("sn.controls.timePicker:minuteChanged", function (evt, minute) {
				$scope.minute = minute;
				buildDate();
				evt.stopPropagation();
			});

			$scope.$on("sn.controls.timePicker:secondChanged", function (evt, second) {
				$scope.second = second;
				buildDate();
				evt.stopPropagation();
			});
		},
		templateUrl: "templates/datetimepicker/datetimepicker.html"
	};
}]);