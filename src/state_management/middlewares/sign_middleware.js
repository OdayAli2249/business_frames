import { ProcessResult } from "../../helpers/failure_or";
import { UserRepository } from "../../repositories/user_repository";
import { Actions, Operations } from "../actions";

export const signUser = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.SIGN_LOADING });
        let fialureOrData;
        if (params.operation == Operations.CREATE)
            fialureOrData = await UserRepository.getInstance().createUser(params);
        else if (params.operation == Operations.LOGIN)
            fialureOrData = await UserRepository.getInstance().login(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.SIGN_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage', operation: params.operation }
            }) :
            dispatch({
                type: Actions.SIGN_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.SIGN_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
