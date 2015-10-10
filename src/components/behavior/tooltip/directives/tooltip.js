import template from "../templates/tooltip.html";

export default class ToolTipDirective {
    constructor($document, $compile, $rootScope, UIHelper) {
        this.restrict = "A";

        this.$document = $document;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.UIHelper = UIHelper;
        
        this.scope = {
			content: "=snTooltip"
		};
    }

    link(scope, element, attrs) {
        let tooltip = angular.element(template);

        this.$compile(tooltip)(scope);
	
		element.on("mouseenter", function (evt) {
			var target = evt.target;
			var offset = this.UIHelper.getOffset(target);
	
			this.$document.find("body").append(tooltip);
			tooltip.addClass("in");
	
			var x = offset.x + element[0].offsetWidth;
			var y = offset.y + (element[0].offsetHeight - tooltip[0].offsetHeight) / 2;
	
			tooltip.css("z-index", "1500");
			tooltip.css("display", "block");
			tooltip.css("left", x + "px");
			tooltip.css("top", y + "px");
		}.bind(this));
	
		element.on("mouseleave", function () {
			tooltip.remove();
		});
    }
}

ToolTipDirective.$inject = ["$document", "$compile", "$rootScope", "UIHelper"];