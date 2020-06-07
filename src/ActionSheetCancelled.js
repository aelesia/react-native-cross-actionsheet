export class ActionSheetCancelled extends Error {
    constructor(msg) {
        super('ActionSheet was cancelled');
        this.name = 'ActionSheetCancelled';
        Object.setPrototypeOf(this, Error.prototype);
    }
}
