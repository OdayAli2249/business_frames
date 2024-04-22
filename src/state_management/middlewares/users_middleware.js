import { ProcessResult } from "../../helpers/failure_or";
import { UserRepository } from "../../repositories/user_repository";
import { Actions } from "../actions";

export const getUsers = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_USERS_LOADING });

        const fialureOrData = await UserRepository.getInstance().getUsers(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_USERS_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_USERS_FAILURE, payload: { failure: fialureOrData.failure } });
        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
