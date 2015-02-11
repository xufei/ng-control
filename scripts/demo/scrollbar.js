angular.module("sn.demo").controller("TestScrollCtrl", ["$scope", function ($scope) {
    $scope.$on("sn.controls.scrollbar:positionChanged",  function(evt, position) {
        $scope.position = position;

        $scope.$digest();
    });
}]);