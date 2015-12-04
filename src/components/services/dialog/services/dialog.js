export default class DialogService {
    constructor($document, $rootScope, $compile) {
        this.$document = $document;
        this.$rootScope = $rootScope;
        this.$compile = $compile;

        this.dialogCounter = 0;
        this.zIndex = 1200;

        this.dialogSet = new Set();
    }

    modal(template, data, callback) {
        this.dialogCounter += 2;

        let mask = angular.element('<div class="modal-backdrop fade in"></div>');
        this.$document.find("body").append(mask);
        mask.css("z-index", this.zIndex + this.dialogCounter);

        let newScope = this.$rootScope.$new();
        let element = angular.element(template);

        this.$document.find("body").append(element);
        element.css("display", "block");
        element.css("z-index", this.zIndex + this.dialogCounter + 1);

        let dialog = new Dialog(data, callback);
        dialog.element = element;
        dialog.mask = mask;
        dialog.collection = this.dialogSet;
        
        this.dialogSet.add(dialog);
        newScope.dialog = dialog;
        
        this.$compile(element)(newScope);
    }

    closeAll() {
        this.dialogMap.forEach((it, key) => it.close());
    }
}

DialogService.$inject = ["$document", "$rootScope", "$compile"];


class Dialog {
    constructor(data, callback) {
        this.data = data;
        this.callback = callback;
    }

    onOk(result) {
        this.onClose();

        if (this.callback) {
            this.callback(result);
        }
    }

    onClose() {
        this.element.remove();
        this.mask.remove();
        
        this.collection.delete(this);
    }
    
    onCancel() {
        this.element.remove();
        this.mask.remove();
        
        this.collection.delete(this);
    }

    postMessage(type, message) {
        if (this.messageHandler) {
            if (this.messageHandler[type]) {
                this.messageHandler[type](message);
            }
        }
    }
}