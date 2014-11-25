angular.module("sn.controls").directive("snContextmenu", ["$document", "$http", "$compile", "$rootScope", function ($document, $http, $compile, $rootScope) {
	var currentMenu;

	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			$http.get("templates/menu/menu.html").then(function(result) {
				var menu = angular.element(result.data);

				$compile(menu)(angular.extend($rootScope.$new(), {
					menuArr: scope.$eval(attrs["snContextmenu"])
				}));

				element.on("contextmenu", function (evt) {
					var mouseX = evt.clientX;
					var mouseY = evt.clientY;

					if ($document.find("body")[0].contains(menu[0])) {
						menu.css("display", "block");
					}
					else {
						$document.find("body").append(menu);
					}

					menu.css("display", "block");
					menu.css("left", mouseX + "px");
					menu.css("top", mouseY + "px");

					evt.stopPropagation();
					evt.preventDefault();

					if (currentMenu && currentMenu != menu) {
						currentMenu.css("display", "none");
					}

					currentMenu = menu;
				});

				$document.on("click", function (evt) {
					menu.css("display", "none");
				});
			});
		}
	};
}]);