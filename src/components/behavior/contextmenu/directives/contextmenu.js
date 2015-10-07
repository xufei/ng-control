import template from "../templates/contextmenu.html";

export default class ContextMenuDirective {
    constructor($document, $compile, $rootScope) {
        this.restrict = "A";

        this.$document = $document;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        
        this.scope = {
            menuArr: "=snContextmenu"
        };
        
        this.currentMenu = null;
    }

    link(scope, element) {
        let menu = angular.element(template);

        this.$compile(menu)(Object.assign(this.$rootScope.$new(), {
            menuArr: scope.menuArr
        }));

        element.on("contextmenu", function (evt) {
            let target = evt.target;
            let offset = UIHelper.getOffset(target);

            let mouseX = (evt.offsetX || evt.layerX) + offset.x;
            let mouseY = (evt.offsetY || evt.layerY) + offset.y;

            if (this.$document.find("body")[0].contains(menu[0])) {
                menu.css("display", "block");
            } else {
                this.$document.find("body").append(menu);
            }

            menu.css("display", "block");
            menu.css("left", mouseX + "px");
            menu.css("top", mouseY + "px");

            evt.stopPropagation();
            evt.preventDefault();

            if (this.currentMenu && this.currentMenu != menu) {
                this.currentMenu.css("display", "none");
            }

            this.currentMenu = menu;
        }.bind(this));

        this.$document.on("click", function (evt) {
            menu.css("display", "none");
        });
    }
}

ContextMenuDirective.$inject = ["$document", "$compile", "$rootScope"];