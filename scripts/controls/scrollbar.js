angular.module("sn.controls").directive("snScrollbar", ["$document", "UIHelper", function ($document, UIHelper) {
    return {
        restrict: "E",
        scope: {},
        controller: function ($scope) {
            $scope.currentStep = 0;
            $scope.maxStep = 10;

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
            scope.maxStep = (attrs["maxstep"] - 0) || 10;

            attrs.$observe("maxstep", function (value) {
                var maxStep = (value - 0) || 0;
                if (maxStep != scope.maxStep) {
                    scope.maxStep = maxStep;

                    if (scope.currentStep > scope.maxStep) {
                        setTimeout(function () {
                            scope.changeValue(0);
                        }, 0);
                    }
                }
            });

            attrs.$observe("currentstep", function (value) {
                var step = (value - 0) || 0;
                if (step != scope.currentStep) {
                    setTimeout(function () {
                        scope.changeValue(step);
                    }, 0);
                }
            });

            element.on("click", function (evt) {
                var src = evt.srcElement ? evt.srcElement : evt.target;

                if (src.tagName != "DIV") {
                    return;
                }

                var allHeight = element.children()[0].offsetHeight;
                var currentHeight = (evt.offsetY || evt.layerY);

                stepperEle.css("height", (currentHeight - 1) + "px");
                scope.changeValue(Math.round(scope.maxStep * currentHeight / allHeight));
            });

            $document.on("keypress", function (evt) {
                if ((evt.keyCode || evt.which) == "45") {
                    scope.decrease();
                    scope.$digest();
                }
                else if ((evt.keyCode || evt.which) == "61") {
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
                    var allHeight = element.children()[0].offsetHeight;
                    var currentHeight = evt.offsetY;

                    var temp = Math.round(scope.maxStep * currentHeight / allHeight);
                    if ((temp >= 0) && (temp <= scope.maxStep)) {
                        value = temp;

                        stepperEle.css("height", currentHeight + 4 + "px");

                        scope.changeValue(value);
                    }
                }
            });

            $document.on("mouseup", function () {
                if (dragging) {
                    //stepperEle.css("width", (value * 100 / scope.maxStep) + "%");

                    //scope.changeValue(value);
                    dragging = false;
                }
            });
        },
        templateUrl: "templates/scrollbar/scrollbar.html"
    };
}]);