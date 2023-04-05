class Box {

    constructor() {
        this.locked = true;
        this._content = [];
    };

    get content() {
        if(this.locked === true) {
            throw new Error("Sorry, the box is locked!");
        } else {
            return this._content;
        };
    };

    unlock() {
        this.locked = false;
    };

    lock() {
        this.locked = true;
    };

};