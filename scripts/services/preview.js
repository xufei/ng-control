angular.module("sn.controls").service("PreviewService", ["$document", "$http", "$compile", "$rootScope", function($document, $http, $compile, $rootScope) {
    var container;
    if (!document.getElementById("previewContainer")) {
        container = angular.element("<div class='sn-preview-container'>");
        $document.find("body").append(container);
    }
    else {
        container = angular.element(document.getElementById("previewContainer"));
    }

    var mask = angular.element('<div class="modal-backdrop fade in"></div>');

    $document.on("click", function(evt) {
        var src = evt.srcElement ? evt.srcElement : evt.target;
        if (!container[0].contains(src)) {
            hide();
        }
    });

    function hide() {
        container.html("");
        mask.remove();
    }

    function showImages(url) {
        $http.get("templates/preview/image.html").then(function (result) {
            var pop = angular.element(result.data);
            $document.find("body").append(mask);
            mask.css("z-index", 1200);

            pop.css("display", "block");

            pop.addClass("in");

            var scope = angular.extend($rootScope.$new(), {url:url});
            scope.close = function() {
                hide();
            };

            $compile(pop)(scope);
            container.prepend(pop);
        });
    }

    return {
        preview: function(url) {
            var arr = url.split(".");
            var extension = "";

            if (arr.length > 0) {
                extension = arr[arr.length-1];
            }

            switch(extension.trim().toLowerCase()) {
                case "jpg":
                case "jpeg":
                case "bmp":
                case "gif":
                case "png":
                case "tiff":{
                    showImages(url);
                    break;
                }
            }
        }
    };
}]);
