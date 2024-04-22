import { Cookies } from "react-cookie";
import { ProcessResult } from "../../helpers/failure_or";
import { UserRepository } from "../../repositories/user_repository";
import { Actions } from "../actions";

export const getUser = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_USER_LOADING });
        const cookies = new Cookies();
        let token = cookies.get('_jwt');
        if (!token)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 1 } });
        else {
            const fialureOrData = await UserRepository.getInstance().getUser(params);
            await sleep(2000);
            if (fialureOrData.result == ProcessResult.SUCCESS)
                dispatch({ type: Actions.GET_USER_SUCCESS, payload: { item: fialureOrData.response.data, type: 1 } })
            else {
                cookies.remove('_jwt')
                dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: fialureOrData.failure, type: 1 } });
            }

        }
    };
};

export const logOut = (_) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_USER_LOADING });
        const cookies = new Cookies();
        cookies.remove('_jwt', { path: '/' })
        dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const resetAuthStatus = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 1 } });
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
