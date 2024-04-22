import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const createService = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_SERVICE_LOADING });

        const fialureOrData = await ServiceProviderRepository.getInstance().createService(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.CREATE_SERVICE_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.CREATE_SERVICE_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
            if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_SERVICE_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
