angular.module("sn.controls").directive("snTooltip", ["$document", "$http", "UIHelper", function ($document, $http, UIHelper) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var url = attrs["snTooltip"];
            var popover;

            $http.get(url).then(function (result) {
                popover = angular.element(result.data);

                element.on("mouseenter", function () {
                    var position = UIHelper.getOffset(element[0]);

                    popover.css("display", "block");
                    popover.css("left", position.x + "px");
                    popover.css("top", position.y + element[0].offsetHeight + "px");

                    $document.find("body").append(popover);
                });

                element.on("mouseleave", function () {
                    popover.remove();
                });
            });
        }
    };
}]);