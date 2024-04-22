
export class FailureOr {
    constructor(response, message, failure, processResult) {
        this.response = response;
        this.message = message;
        this.failure = failure;
        this.result = processResult;
    }

    static buildSuccess(data) {
        return new FailureOr(data, null, null, ProcessResult.SUCCESS)
    }


    static buildFailure(failure) {
        return new FailureOr(null, null, failure, ProcessResult.FAILURE)
    }
}

export class ProcessResult {
    static SUCCESS = 'success';
    static FAILURE = 'failure';
}