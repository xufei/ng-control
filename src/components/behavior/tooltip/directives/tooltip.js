import template from "../templates/tooltip.html";

import { UIHelper } from "../../../utils/ui-helper";

export default class ToolTipDirective {
    constructor($document, $compile, $rootScope) {
        this.restrict = "A";

        this.$document = $document;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        
        this.scope = {
			content: "=snTooltip",
			direction: "="
		};
    }

    link(scope, element, attrs) {
		scope.direction = scope.direction || "right";
		
        let tooltip = angular.element(template);

        this.$compile(tooltip)(scope);
	
		element.on("mouseenter", evt => {
			let target = evt.target;
			let offset = UIHelper.getOffset(target);
	
			this.$document.find("body").append(tooltip);
			tooltip.addClass("in");
	
			let x;
			let y;
			switch (scope.direction) {
				case "left": {
					x = offset.x - tooltip[0].offsetWidth;
					y = offset.y + (element[0].offsetHeight - tooltip[0].offsetHeight) / 2;
					break;
				}
				case "right": {
					x = offset.x + element[0].offsetWidth;
					y = offset.y + (element[0].offsetHeight - tooltip[0].offsetHeight) / 2;
					break;
				}
				case "top": {
					x = offset.x + (element[0].offsetWidth - tooltip[0].offsetWidth) / 2;
					y = offset.y - tooltip[0].offsetHeight;
					break;
				}
				case "bottom": {
					x = offset.x + (element[0].offsetWidth - tooltip[0].offsetWidth) / 2;
					y = offset.y + element[0].offsetHeight;
					break;
				}
			}
	
			tooltip.css("z-index", "1500");
			tooltip.css("display", "block");
			tooltip.css("left", x + "px");
			tooltip.css("top", y + "px");
		});
	
		element.on("mouseleave", function () {
			tooltip.remove();
		});
    }
}

ToolTipDirective.$inject = ["$document", "$compile", "$rootScope"];