angular.module("sn.demo").controller("TestPreviewCtrl", ["$scope", "PreviewService", function($scope, PreviewService) {
    $scope.imageUrl = "http://az29176.vo.msecnd.net/videocontent/ToyTrain_GettyRF_158761874_768_ZH-CN1644147725.jpg";

    $scope.preview = function() {
        PreviewService.preview($scope.imageUrl);
    };
}]);