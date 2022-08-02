class errorHandling extends Error {
    constructor(errorCode, errorMessage) {
        super();
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        console.log(this);
    }
}

module.exports = { Error: errorHandling };
