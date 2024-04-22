import { ProcessResult } from "../../helpers/failure_or";
import { BranchRepository } from "../../repositories/branch_repository";
import { Actions } from "../actions";

export const createBranch = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_BRANCH_LOADING });

        const fialureOrData = await BranchRepository.getInstance().createBranch(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.CREATE_BRANCH_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage', id: fialureOrData.response.id }
            }) :
            dispatch({
                type: Actions.CREATE_BRANCH_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_BRANCH_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
