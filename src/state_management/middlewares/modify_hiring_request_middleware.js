import { ProcessResult } from "../../helpers/failure_or";
import { BranchRepository } from "../../repositories/branch_repository";
import { HiringRequestRepository } from "../../repositories/hiring_request_repository";
import { Actions, Operations } from "../actions";

export const modifyHiringRequest = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_HIRING_REQUESTS_LOADING });
        let fialureOrData;
        if (params.operation == Operations.CANCEL)
            fialureOrData = await HiringRequestRepository.getInstance().cancelHiringRequest(params);
        else if (params.operation == Operations.REJECT)
            fialureOrData = await HiringRequestRepository.getInstance().rejectHiringRequest(params);
        else if (params.operation == Operations.ACCEPT)
            fialureOrData = await BranchRepository.getInstance().addNewUsersToBranch(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_HIRING_REQUESTS_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_HIRING_REQUESTS_FAILURE,
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
        dispatch({ type: Actions.MODIFY_HIRING_REQUESTS_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
