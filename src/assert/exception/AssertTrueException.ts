export class AssertTrueException extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = "AssertTrueException";
    }
}
