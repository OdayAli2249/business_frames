import { ProcessResult } from "../../helpers/failure_or";
import { HiringRequestRepository } from "../../repositories/hiring_request_repository";
import { Actions } from "../actions";

export const getHiringRequests = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_HIRING_REQUESTS_LOADING });

        let fialureOrData;
        if (params.role == 'master' || params.role == 'sub-master')
            fialureOrData = await HiringRequestRepository.getInstance().getPendingServiceProvidertHiringRequest(params);
        else fialureOrData = await HiringRequestRepository.getInstance().getUserHiringRequests(params);

        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_HIRING_REQUESTS_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_HIRING_REQUESTS_FAILURE, payload: { failure: fialureOrData.failure } });
        if (fialureOrData.failure && fialureOrData.failure.code == 401 && !params.byRefresh)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
