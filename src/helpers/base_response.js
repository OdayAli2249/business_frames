export class BaseResponse {

    constructor(data, id, templateMessage, cudResponseObjects, operation) {
        this.data = data;
        this.id = id;
        this.templateMessage = templateMessage;
        this.cudResponseObjects = cudResponseObjects;
        this.operation = operation
    }

    getData() {
        return this.data;
    }

    static build({ data, id, templateMessage, cudResponseObjects, operation }) {
        return new BaseResponse(data, id, templateMessage, cudResponseObjects, operation);
    }
}