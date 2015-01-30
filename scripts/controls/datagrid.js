angular.module("sn.controls").directive("snDatagrid", ["$document", "UIHelper", function ($document, UIHelper) {
    return {
        restrict: "E",
        scope: {},
        controller: function ($scope) {
            $scope.cols = [{
                name: "Name",
                key: "name"
            }, {
                name: "Gender",
                key: "gender"
            }, {
                name: "Age",
                key: "age"
            }];

            $scope.gridData = [];

            for (var i=0; i<100; i++) {
                var item = {
                    name: "Tom" + i,
                    age: i,
                    gender: 1
                };
                $scope.gridData.push(item);
            }

            var index = 0;
            getVisibleItems(index);

            function getVisibleItems(index) {
                var displayLength = 20;

                if ($scope.gridData.length <= displayLength) {
                    $scope.visibleGridData = $scope.gridData;
                }
                else if ($scope.gridData.length < index + displayLength) {
                    $scope.visibleGridData = $scope.gridData.slice($scope.gridData.length - displayLength, $scope.gridData.length);
                }
                else {
                    $scope.visibleGridData = $scope.gridData.slice(index, index + displayLength);
                }
            }

            $scope.select = function(item) {
                $scope.selectedItem = item;
            };

            $scope.$on("sn.controls.stepper:stepperValueChanged", function(evt, newValue) {
                index = newValue;
                getVisibleItems(index);
                $scope.$digest();
            });
        },
        link: function (scope, element, attrs) {

        },
        templateUrl: "templates/datagrid/datagrid.html"
    }
}]).constant('datagridConfig', {
});