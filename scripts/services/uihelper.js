angular.module("sn.controls").service("UIHelper", function () {
    return {
        getOffset: function (element) {
            var x = 0;
            var y = 0;

            while (element.offsetParent) {
                x += element.offsetLeft;
                y += element.offsetTop;

                element = element.offsetParent;
            }

            return {x: x, y: y};
        }
    };
});