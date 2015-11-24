import { UIHelper } from "../../../utils/ui-helper";

export default class DropdownDirective {
    constructor() {
        this.restrict = "A";
    }

    link(scope, element) {
        angular.element(element.children[0]).on("click", evt => {
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