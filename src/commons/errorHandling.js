class errorHandling extends Error {
    constructor(errorCode, errorMessage) {
        super();
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

module.exports = { Error: errorHandling };
