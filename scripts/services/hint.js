angular.module("sn.controls").service("HintService", ["$http", "$compile", "$rootScope", function ($http, $compile, $rootScope) {
    var container = angular.element(document.getElementById("hintContainer"));

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