export default class DropdownDirective {
    constructor($document) {
        this.restrict = "A";
        
        this.$document = $document;
    }

    link(scope, element) {
        element.find("button").on("click", function (evt) {
            element.toggleClass("open");

            evt.preventDefault();
            evt.stopPropagation();
        });

        this.$document.on("click", function () {
            element.removeClass("open");
        });
    }
}

DropdownDirective.$inject = ["$document"];