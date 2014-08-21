angular.module("sn.controls").directive("snDatetimepicker", ["$document", function ($document) {
    return {
        restrict: "E",
        scope: {},
        link: function (scope, element, attrs) {
            if (attrs["ngModel"]) {
                scope.$modelKey = attrs["ngModel"];
            }

            $document.on("click", function (evt) {
                if (!element[0].contains(evt.srcElement)) {
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

            function buildDate() {
                var now = new Date();
                $scope.currentDate = new Date(
                        $scope.year || now.getFullYear(),
                        $scope.month || now.getMonth(),
                        $scope.date || now.getDate(),
                        $scope.hour || now.getHours(),
                        $scope.minute || now.getMinutes(),
                        $scope.second || now.getSeconds()
                ).toLocaleString();
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