class ElementNotFoundError extends Error {

    constructor(message) {
        super(message);
    };

};

class EmptyArrayError extends Error {

    constructor(message) {
        super(message);
    };

};

class MultiplicatorUnitFailed extends Error {

    constructor() {
        super("Klank!")
    };

};