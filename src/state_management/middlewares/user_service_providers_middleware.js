import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const getUserServiceProviders = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_USER_SERVICE_PROVIDERS_LOADING });

        let fialureOrData = await ServiceProviderRepository.getInstance().getUserServiceProviders(params);

        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_USER_SERVICE_PROVIDERS_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_USER_SERVICE_PROVIDERS_FAILURE, payload: { failure: fialureOrData.failure } });
        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
