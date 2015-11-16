import { UIHelper } from "../../../utils/ui-helper";

export default class DropdownDirective {
    constructor($document) {
        this.restrict = "A";

        this.$document = $document;
    }

    link(scope, element) {
        element.find("button").on("click", evt => {
            element.toggleClass("open");

            evt.preventDefault();
            evt.stopPropagation();
        });

        let closeEvent = UIHelper.listen(window, 'click', (e) => {
            //if (!element[0].contains(e.target)) {
                element.removeClass("open");
            //}
        });
		
		scope.$on('$destroy', () => closeEvent.remove());
    }
}

DropdownDirective.$inject = ["$document"];