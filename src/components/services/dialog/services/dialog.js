
export default class DialogService {
    constructor($document, $http, $rootScope, $compile) {
        this.$document = $document;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$compile = $compile;

        this.dialogCounter = 0;
        this.zIndex = 1200;

        this.dialogMap = new Map();
    }

    modal(param, data) {
        if (param.url) {
            this.$http.get(param.url).then(result => this.show(param, result.data));
        }
        else if (param.template) {
            this.show(param, param.template);
        }
    }
    
    show(param, template) {
        this.dialogCounter += 2;

        let mask = angular.element('<div class="modal-backdrop fade in"></div>');
        this.$document.find("body").append(mask);
        mask.css("z-index", this.zIndex + this.dialogCounter);

        let element = this.$compile(angular.element(template))(Object.assign(this.$rootScope.$new(), data));

        this.$document.find("body").append(element);
        element.css("display", "block");
        element.css("z-index", this.zIndex + this.dialogCounter + 1);

        this.dialogMap.set(param.key, Object.assign(param, {
            dialog: element,
            mask: mask
        }));
    }

    accept(key, result) {
        this.dismiss(key);

        if (this.dialogMap.get(key).accept) {
            this.dialogMap.get(key).accept(result);
        }
    }

    refuse(key, reason) {
        this.dismiss(key);

        if (this.dialogMap.get(key).refuse) {
            this.dialogMap.get(key).refuse(reason);
        }
    }

    dismiss(key) {
        let dialog = this.dialogMap.get(key);
        dialog.mask.remove();
        dialog.dialog.remove();
    }

    postMessage(key, type, message) {
        if (this.dialogMap.get(key).messageHandler) {
            if (this.dialogMap.get(key).messageHandler[type]) {
                this.dialogMap.get(key).messageHandler[type](message);
            }
        }
    }
}

DialogService.$inject = ["$document", "$http", "$rootScope", "$compile"];