class errorHandling extends Error {
    constructor(errorCode, errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

module.exports = { Error: errorHandling };
