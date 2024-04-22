import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const createServiceProvider = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_SERVICE_PROVIDERS_LOADING });

        const fialureOrData = await ServiceProviderRepository.getInstance().createServiceProvider(params);
        await sleep(2000);
        // var res = { response: { message: 'Service provider created successfuly' }, result: ProcessResult.SUCCESS }
        // const data = await response.json();
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.CREATE_SERVICE_PROVIDERS_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage', id: fialureOrData.response.id }
            }) :
            dispatch({
                type: Actions.CREATE_SERVICE_PROVIDERS_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_SERVICE_PROVIDERS_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
