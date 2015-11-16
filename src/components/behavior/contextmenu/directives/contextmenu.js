import template from "../templates/contextmenu.html";

import { UIHelper } from "../../../utils/ui-helper";

export default class ContextMenuDirective {
    constructor($document, $compile, $rootScope) {
        this.restrict = "A";

        this.$document = $document;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        
        ContextMenuDirective.currentMenu = null;
    }

    link(scope, element, attrs) {
        let menu = angular.element(template);

        this.$compile(menu)(Object.assign(this.$rootScope.$new(), {
            menuArr: scope.$eval(attrs["snContextmenu"])
        }));

        element.on("contextmenu", evt => {
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

            if (ContextMenuDirective.currentMenu && this.currentMenu != menu) {
                ContextMenuDirective.currentMenu.css("display", "none");
            }

            ContextMenuDirective.currentMenu = menu;
        });

        let closeEvent = UIHelper.listen(window, 'click', (e) => menu.css("display", "none"));
		
		scope.$on('$destroy', () => closeEvent.remove());
    }
}

ContextMenuDirective.$inject = ["$document", "$compile", "$rootScope"];