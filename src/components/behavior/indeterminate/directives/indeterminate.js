export default class IndeterminateDirective {
    constructor() {
        this.restrict = "A";
        
        this.scope = {
            value: "=ngModel"
        };
    }

    link(scope, element) {
        scope.$watch("value", value => {
            if (angular.isUndefined(value) || value === null) {
                element[0].indeterminate = true;
            } else {
                element[0].indeterminate = false;
            }
        });
    }
}