import { ProcessResult } from "../../helpers/failure_or";
import { UserRepository } from "../../repositories/user_repository";
import { Actions } from "../actions";

export const getUserById = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_USER_BY_ID_LOADING });

        const fialureOrData = await UserRepository.getInstance().getUserById(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_USER_BY_ID_SUCCESS, payload: { item: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_USER_BY_ID_FAILURE, payload: { failure: fialureOrData.failure } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
