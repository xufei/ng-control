export default class DropdownDirective {
    constructor($document, UIHelper) {
        this.restrict = "A";

        this.$document = $document;
        this.UIHelper = UIHelper;
    }

    link(scope, element) {
        element.find("button").on("click", function (evt) {
            element.toggleClass("open");

            evt.preventDefault();
            evt.stopPropagation();
        });

        let closeEvent = this.UIHelper.listen(window, 'click', (e) => {
            //if (!element[0].contains(e.target)) {
                element.removeClass("open");
            //}
        });
		
		scope.$on('$destroy', function() {
            closeEvent.remove();
        });
    }
}

DropdownDirective.$inject = ["$document", "UIHelper"];