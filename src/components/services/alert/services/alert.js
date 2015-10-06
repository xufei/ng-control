import template from "../templates/alert.html";

export default class AlertService {
    constructor($document, $q, $rootScope, $compile) {
        this.$document = $document;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$compile = $compile;

        this.dialogCounter = 0;
        this.zIndex = 1200;

        this.mask = angular.element('<div class="modal-backdrop fade in"></div>');
        this.mask.css("z-index", this.zIndex);
    }

    alert(param) {
        let defer = this.$q.defer();

        let dialog;
        this.dialogCounter++;

        if (this.dialogCounter == 1) {
            this.$document.find("body").append(this.mask);
        }

        let data = this.$rootScope.$new();
        angular.extend(data, param);

        data.ok = function () {
            this.dismiss(dialog);
            defer.resolve("ok");
        }.bind(this);

        data.cancel = function () {
            this.dismiss(dialog);
            defer.reject("cancel");
        }.bind(this);

        dialog = this.$compile(angular.element(template))(data);

        this.$document.find("body").append(dialog);
        dialog.css("display", "block");
        dialog.css("z-index", this.zIndex + this.dialogCounter);

        return defer.promise;
    }

    confirm(param) {
        let defer = this.$q.defer();

        let dialog;
        this.dialogCounter++;

        if (this.dialogCounter == 1) {
            this.$document.find("body").append(this.mask);
        }

        let data = this.$rootScope.$new();
        angular.extend(data, param);

        data.ok = function () {
            this.dismiss(dialog);
            defer.resolve("ok");
        }.bind(this);

        data.cancel = function () {
            this.dismiss(dialog);
            defer.reject("cancel");
        }.bind(this);

        data.close = function () {
            this.dismiss(dialog);
        }.bind(this);

        dialog = this.$compile(template)(data);

        this.$document.find("body").append(dialog);
        dialog.css("display", "block");
        dialog.css("z-index", this.zIndex + this.dialogCounter);

        return defer.promise;
    }

    dismiss(dialog) {
        this.dialogCounter--;
        dialog.remove();

        if (this.dialogCounter == 0) {
            this.mask.remove();
        }
    }
}

AlertService.$inject = ["$document", "$q", "$rootScope", "$compile"];