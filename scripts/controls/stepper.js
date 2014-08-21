angular.module("sn.controls").directive("snStepper", ["$document", "UIHelper", function ($document, UIHelper) {
    return {
        restrict: "E",
        scope: {},
        controller: function ($scope) {
            $scope.currentStep = 0;
            $scope.maxStep = 10;

            $scope.stepperStyle = function () {
                return {width: ($scope.currentStep * 100 / $scope.maxStep) + "%"};
            };

            $scope.increase = function () {
                $scope.changeValue($scope.currentStep + 1);
            };

            $scope.decrease = function () {
                $scope.changeValue($scope.currentStep - 1);
            };

            $scope.changeValue = function (value) {
                if ((value >= 0) && (value <= $scope.maxStep) && (value != $scope.currentStep)) {
                    $scope.currentStep = value;
                    $scope.$emit("sn.controls.stepper:stepperValueChanged", $scope.currentStep);
                }
            };
        },
        link: function (scope, element, attrs) {
            scope.maxStep = (attrs.maxstep - 0) || 10;

            attrs.$observe("currentstep", function (value) {
                var step = (value - 0) || 0;
                if (step != scope.currentStep) {
                    setTimeout(function(){
                        scope.changeValue(step);
                    },0);
                }
            });

            element.on("click", function (evt) {
                if (evt.srcElement.tagName != "DIV") {
                    return;
                }

                var allWidth = element.children()[0].offsetWidth;
                var currentWidth = evt.offsetX;

                scope.changeValue(Math.ceil(scope.maxStep * currentWidth / allWidth));
            });

            $document.on("keypress", function (evt) {
                if (evt.keyCode == "45") {
                    scope.decrease();
                    scope.$digest();
                }
                else if (evt.keyCode == "61") {
                    scope.increase();
                    scope.$digest();
                }
            });

            var dragging = false;
            var value = scope.currentValue;
            var stepperEle = angular.element(element.find("div")[1]);
            element.find("button").on("mousedown", function () {
                dragging = true;
            });

            element.on("mousemove", function (evt) {
                if (dragging) {
                    var allWidth = element.children()[0].offsetWidth;
                    var currentWidth = evt.clientX - UIHelper.getOffset(element.find("div")[1]).x;

                    var temp = Math.ceil(scope.maxStep * currentWidth / allWidth);
                    if ((temp >=0) && (temp <= scope.maxStep)) {
                        value = temp;

                        stepperEle.css("width", (Math.ceil(currentWidth * 100 / allWidth)) + "%");
                    }
                }
            });

            $document.on("mouseup", function () {
                scope.changeValue(value);
                scope.$digest();
                dragging = false;
            });
        },
        templateUrl: "templates/stepper/stepper.html"
    };
}]);