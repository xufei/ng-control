angular.module("sn.controls").directive("snDropdown", ["$document", function ($document) {
    return {
        restrict: "A",
        link: function (scope, element) {
            element.find("button").on("click", function (evt) {
                element.toggleClass("open");

                evt.preventDefault();
                evt.stopPropagation();
            });

            $document.on("click", function () {
                element.removeClass("open");
            });
        }
    };
}]);