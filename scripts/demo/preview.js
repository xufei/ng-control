angular.module("sn.demo").controller("TestPreviewCtrl", ["$scope", "PreviewService", function($scope, PreviewService) {
    $scope.imageUrl = "https://assets-cdn.github.com/assets/modules/dashboard/bootcamp/octocat_fork-6e0b56d6903d4e2e32ffdeb1ebe0ce5c79ce938f45acf803f3421cc5aafc05aa.png";

    $scope.changeImg = function() {
        $scope.imageUrl = "http://az29176.vo.msecnd.net/videocontent/ToyTrain_GettyRF_158761874_768_ZH-CN1644147725.jpg";
    };

    $scope.preview = function() {
        PreviewService.preview($scope.imageUrl);
    };
}]);