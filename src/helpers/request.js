export class Request {

    constructor(
        endPoint,
        queryParams,
        pathParams,
        data) {
        this.endPoint = endPoint;
        this.queryParams = queryParams;
        this.pathParams = pathParams;
        this.data = data;
    }

    static build(
        endPoint,
        queryParams,
        pathParams,
        data
    ) {
        return new Request(
            endPoint,
            queryParams,
            pathParams,
            data
        )
    }
}