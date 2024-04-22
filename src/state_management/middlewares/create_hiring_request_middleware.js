import { ProcessResult } from "../../helpers/failure_or";
import { HiringRequestRepository } from "../../repositories/hiring_request_repository";
import { Actions } from "../actions";

export const createHiringRequest = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_HIRING_REQUEST_LOADING });

        const fialureOrData = await HiringRequestRepository.getInstance().createHiringRequest(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.CREATE_HIRING_REQUEST_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.CREATE_HIRING_REQUEST_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
            if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_HIRING_REQUEST_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
