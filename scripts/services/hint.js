angular.module("sn.controls").service("HintService", ["$http", "$document", "$compile", "$rootScope", function ($http, $document, $compile, $rootScope) {
	var container;
	if (!document.getElementById("hintContainer")) {
		container = angular.element("<div class='sn-hint-container'>");
		$document.find("body").append(container);
	}
	else {
		container = angular.element(document.getElementById("hintContainer"));
	}

    return {
        hint: function (param, url) {
            $http.get(url || "templates/hint/hint.html").then(function (result) {
                var hint = angular.element(result.data);

                hint.css("display", "block");

                var scope = angular.extend($rootScope.$new(), param);

                $compile(hint)(scope);
                container.prepend(hint);

                setTimeout(function () {
                    hint.addClass("in");
                }, 10);

                setTimeout(function () {
                    hint.removeClass("in");

                    setTimeout(function () {
                        hint.remove();
                    }, 500);
                }, 5000);
            });
        }
    };
}]);