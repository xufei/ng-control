angular.module("sn.controls").directive("snContextmmenu", ["$document", "$http", "UIHelper", function ($document, $http, UIHelper) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var menu = angular.element('<ul class="dropdown-menu"></ul>');

            var menuArr = scope.$eval(attrs["snContextmmenu"]);

            for (var i = 0; i < menuArr.length; i++) {
                if (menuArr[i].action) {
                    var menuItem = angular.element('<li><a>' + menuArr[i].title + '</a></li>');
                    menuItem.on("click", (function (index) {
                        return function () {
                            menu.remove();
                            menuArr[index].action();
                        };
                    })(i));
                    menu.append(menuItem);
                }
                else {
                    menu.append('<li class="divider"></li>');
                }
            }

            element.on("contextmenu", function (evt) {
                var mouseX = evt.clientX;
                var mouseY = evt.clientY;

                $document.find("body").append(menu);
                menu.css("display", "block");
                menu.css("left", mouseX + "px");
                menu.css("top", mouseY + "px");

                evt.stopPropagation();
                evt.preventDefault();

                if ($document.currentMenu && $document.currentMenu != menu) {
                    $document.currentMenu.remove();
                }

                $document.currentMenu = menu;
            });

            $document.on("click", function () {
                menu.remove();
            });
        }
    };
}]);