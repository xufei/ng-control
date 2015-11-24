import { UIHelper } from "../../../utils/ui-helper";

export default class DropdownDirective {
    constructor() {
        this.restrict = "A";
        
        this.dropdowns = new Map();
    }

    link(scope, element) {
        angular.element(element.children()[0]).on("click", evt => {
            element.toggleClass("open");

            evt.preventDefault();
            evt.stopPropagation();
            
            this.dropdowns.delete(this);
            this.dropdowns.forEach(it => it.removeClass("open"));
            this.dropdowns.set(this, element);
        });

        let closeEvent = UIHelper.listen(window, 'click', (e) => {
            //if (!element[0].contains(e.target)) {
                element.removeClass("open");
            //}
        });
		
		scope.$on('$destroy', () => {
            closeEvent.remove();
            
            this.dropdowns.delete(this);
        });
    }
}