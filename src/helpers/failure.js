export class Failure {

    constructor(object, action, description, message, code) {
        this.object = object;
        this.action = action;
        this.description = description;
        this.code = code;
    }

    static buildFromError(error) {
        return new Failure(error.object, error.action, error.description, error.message, error.status);
    }
}