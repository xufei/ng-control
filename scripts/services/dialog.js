angular.module("sn.controls", []);

angular.module("sn.controls").service("DialogService", ["$http", "$document", "$rootScope", "$compile", function ($http, $document, $rootScope, $compile) {
    var zIndex = 1050;
    var dialogCounter = 0;

    var dialogMap = {};
    return {
        modal: function (param, data) {
            $http.get(param.url).then(function (result) {
                dialogCounter+=2;

                var mask = angular.element('<div class="modal-backdrop fade in"></div>');
                $document.find("body").append(mask);
                mask.css("z-index", zIndex + dialogCounter);

                var dialog = angular.element(result.data);
                var newScope = $rootScope.$new();
                if (data) {
                    angular.extend(newScope, data);
                }
                var element = $compile(dialog)(newScope);

                $document.find("body").append(element);
                element.css("display", "block");
                element.css("z-index", zIndex + dialogCounter + 1);

                dialogMap[param.key] = param;
                dialogMap[param.key].dialog = element;
                dialogMap[param.key].mask = mask;
            });
        },

        accept: function (key, result) {
            this.dismiss(key);

            if (dialogMap[key].accept) {
                dialogMap[key].accept(result);
            }
        },

        refuse: function (key, reason) {
            this.dismiss(key);

            if (dialogMap[key].refuse) {
                dialogMap[key].refuse(reason);
            }
        },

        dismiss: function (key) {
            dialogMap[key].mask.remove();
            dialogMap[key].dialog.remove();
        },

        postMessage: function (key, type, message) {
            if (dialogMap[key].messageHandler) {
                if (dialogMap[key].messageHandler[type]) {
                    dialogMap[key].messageHandler[type](message);
                }
            }
        }
    };
}]);