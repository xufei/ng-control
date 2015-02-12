angular.module("sn.controls").directive("snList", ["$document", function ($document) {
    return {
        restrict: "E",
        scope: {},
        controller: function ($scope) {
            $scope.options = {

            };
            $scope.listData = [];
            $scope.visibleListData = [];

            for (var i=0; i<10000; i++) {
                $scope.listData.push({
                    index: i
                });
            }

            var index = 0;
            getVisibleItems(index);

            function getVisibleItems(index) {
                var displayLength = 6;

                if ($scope.listData.length <= displayLength) {
                    $scope.visibleListData = $scope.listData;
                }
                else if ($scope.listData.length < index + displayLength) {
                    $scope.visibleListData = $scope.listData.slice($scope.listData.length - displayLength, $scope.listData.length-1);
                }
                else {
                    $scope.visibleListData = $scope.listData.slice(index, index + displayLength);
                }
            }

            $scope.select = function(item) {
                $scope.selectedItem = item;
            };

            $scope.$on("sn.controls.scrollbar:positionChanged", function(evt, position) {
                index = $scope.listData.length * (position / 245);
                getVisibleItems(index);
                $scope.$digest();
            });
        },
        link: function (scope, element, attrs) {

        },
        templateUrl: "templates/list/list.html"
    }
}]).constant('listConfig', {
});