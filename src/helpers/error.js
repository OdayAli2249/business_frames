export class ServerError extends Error {
    constructor(object, action, description, status) {
        super();
        this.object = object;
        this.action = action;
        this.description = description;
        this.status = status;
    }

    static build(error) {
        return new ServerError(error.object,
            error.action,
            error.description,
            error.statusCode);
    }
}

export class AxiosError extends Error {
    constructor(message, code) {
        super();
        this.message = message;
        this.code = code;
    }

    static build(error) {
        return new AxiosError(
            error.message,
            error.code);
    }
}
