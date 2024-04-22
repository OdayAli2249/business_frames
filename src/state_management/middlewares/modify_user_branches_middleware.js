import { ProcessResult } from "../../helpers/failure_or";
import { BranchRepository } from "../../repositories/branch_repository";
import { Actions } from "../actions";

export const modifyUserBranches = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_USER_BRANCHES_LOADING });

        const fialureOrData = params.operation == 'remove' ?
            await BranchRepository.getInstance().removeExistedUsersFromBranch(params) :
            params.operation == 'copy' ? await BranchRepository.getInstance().addExistedUsersToBranch(params) :
                await BranchRepository.getInstance().transferExistedUsersToBranch(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_USER_BRANCHES_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_USER_BRANCHES_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
            if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_USER_BRANCHES_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
