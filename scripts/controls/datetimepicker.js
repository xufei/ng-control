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

            $scope.$on("sn.controls.calendar:dateSelected", function (evt, data) {
                $scope.selectedDate = new Date(data.year, data.month, data.date).toLocaleString();
                $scope.pop = false;

                if ($scope.$modelKey) {
                    $scope.$parent[$scope.$modelKey] = $scope.selectedDate;
                }
                evt.preventDefault();
                evt.stopPropagation();
            });
        },
        templateUrl: "templates/datetimepicker/datetimepicker.html"
    };
}]);