angular.module("sn.controls").directive("snTooltip", ["$document", "$http", "$compile", "$rootScope", "UIHelper",
    function ($document, $http, $compile, $rootScope, UIHelper) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var url = attrs.snTooltip || "templates/tooltip/tooltip.html";
                var content = attrs.content;

                var tooltip;

                $http.get(url).then(function (result) {
                    tooltip = angular.element(result.data);

                    var newScope = angular.extend($rootScope.$new(), {
                        content: content
                    });
                    $compile(tooltip)(newScope);

                    element.on("mouseenter", function (evt) {
                        var target = evt.target;
                        var offset = UIHelper.getOffset(target);

                        $document.find("body").append(tooltip);
                        tooltip.addClass("in");

                        var x = offset.x + element[0].offsetWidth;
                        var y = offset.y + (element[0].offsetHeight - tooltip[0].offsetHeight) / 2;

                        tooltip.css("z-index", "1500");
                        tooltip.css("display", "block");
                        tooltip.css("left", x + "px");
                        tooltip.css("top", y + "px");
                    });

                    element.on("mouseleave", function () {
                        tooltip.remove();
                    });
                });
            }
        };
    }]);
