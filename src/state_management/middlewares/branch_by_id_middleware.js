import { ProcessResult } from "../../helpers/failure_or";
import { BranchRepository } from "../../repositories/branch_repository";
import { Actions } from "../actions";

export const getBranchById = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_BRANCH_BY_ID_LOADING });

        const fialureOrData = await BranchRepository.getInstance().getBranchById(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_BRANCH_BY_ID_SUCCESS, payload: { item: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_BRANCH_BY_ID_FAILURE, payload: { failure: fialureOrData.failure } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
