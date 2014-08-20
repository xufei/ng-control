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

            $scope.$on("sn.controls.calendar:yearChanged", function (evt, data) {
                $scope.year = data.year;
                buildDate();
                evt.stopPropagation();
            });

            $scope.$on("sn.controls.calendar:monthChanged", function (evt, data) {
                $scope.month = data.month;
                buildDate();
                evt.stopPropagation();
            });

            $scope.$on("sn.controls.calendar:dateChanged", function (evt, data) {
                $scope.date = data.date;
                buildDate();
                evt.stopPropagation();
            });

            $scope.$on("sn.controls.timepicker:hourChanged", function (evt, data) {
                $scope.hour = data.hour;
                buildDate();
                evt.stopPropagation();
            });

            $scope.$on("sn.controls.timepicker:minuteChanged", function (evt, data) {
                $scope.minute = data.minute;
                buildDate();
                evt.stopPropagation();
            });

            $scope.$on("sn.controls.timepicker:secondChanged", function (evt, data) {
                $scope.second = data.second;
                buildDate();
                evt.stopPropagation();
            });
        },
        templateUrl: "templates/datetimepicker/datetimepicker.html"
    };
}]);