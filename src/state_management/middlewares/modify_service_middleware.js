import { ProcessResult } from "../../helpers/failure_or";
import { ServiceRepository } from "../../repositories/service_repository";
import { Actions, Operations } from "../actions";

export const modifyService = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_SERVICE_LOADING });
        let fialureOrData;
        if (params.operation == Operations.CREATE)
            fialureOrData = await ServiceRepository.getInstance().createService(params);
        else if (params.operation == Operations.EDIT)
            fialureOrData = await ServiceRepository.getInstance().updateService(params);
        else if (params.operation == Operations.REMOVE)
            fialureOrData = await ServiceRepository.getInstance().deleteService(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_SERVICE_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_SERVICE_FAILURE,
                payload: {
                    message: fialureOrData.failure.description ? fialureOrData.failure.description[0]
                        : "--Error! operation hasn't been completed"
                }
            });

        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_SERVICE_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
