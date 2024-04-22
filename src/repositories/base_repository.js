import { ServerError } from "../helpers/error";
import { Failure } from "../helpers/failure";
import { FailureOr } from "../helpers/failure_or";

export class BaseRepositoy {
    // error handler + pre request inspector
    async requestWrapper(requestCallBack, params) {
        return new Promise(async (resolve, _) => {
            try {
                // pre-request logic here, for example: refresh token
                var response = await requestCallBack(params);

                resolve(FailureOr.buildSuccess(response));

            } catch (error) {
                if (error instanceof ServerError)
                    resolve(FailureOr.buildFailure(Failure.buildFromError(error)));
                else resolve(FailureOr.buildFailure(
                    Failure.buildFromError({
                        desciption: error.message,
                        status: error.code
                    })
                ));
            }
        })
    }
}