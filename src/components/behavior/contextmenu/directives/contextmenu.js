import template from "../templates/contextmenu.html";

export default class ContextMenuDirective {
    constructor($document, $compile, $rootScope, UIHelper) {
        this.restrict = "A";

        this.$document = $document;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.UIHelper = UIHelper;
        
        ContextMenuDirective.currentMenu = null;
    }

    link(scope, element, attrs) {
        let menu = angular.element(template);

        this.$compile(menu)(Object.assign(this.$rootScope.$new(), {
            menuArr: scope.$eval(attrs["snContextmenu"])
        }));

        element.on("contextmenu", function (evt) {
            let target = evt.target;
            let offset = this.UIHelper.getOffset(target);

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

            if (ContextMenuDirective.currentMenu && this.currentMenu != menu) {
                ContextMenuDirective.currentMenu.css("display", "none");
            }

            ContextMenuDirective.currentMenu = menu;
        }.bind(this));

        let closeEvent = this.UIHelper.listen(window, 'click', (e) => {
            menu.css("display", "none");
        });
		
		scope.$on('$destroy', function() {
            closeEvent.remove();
        });
    }
}

ContextMenuDirective.$inject = ["$document", "$compile", "$rootScope", "UIHelper"];