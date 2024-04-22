import { ProcessResult } from "../../helpers/failure_or";
import { ServiceRepository } from "../../repositories/service_repository";
import { Actions } from "../actions";

export const getServices = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_SERVICES_LOADING });

        const fialureOrData = await ServiceRepository.getInstance().getServicesWithPermissions(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_SERVICES_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_SERVICES_FAILURE, payload: { failure: fialureOrData.failure } });
        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
