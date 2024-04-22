import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const getServiceProviderById = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_SERVICE_PROVIDER_BY_ID_LOADING });

        const fialureOrData = await ServiceProviderRepository.getInstance().getServiceProviderById(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_SERVICE_PROVIDER_BY_ID_SUCCESS, payload: { item: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_SERVICE_PROVIDER_BY_ID_FAILURE, payload: { failure: fialureOrData.failure } });
        
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
