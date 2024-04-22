import { ProcessResult } from "../../helpers/failure_or";
import { PermissionsRepository } from "../../repositories/permissions_repository";
import { Actions } from "../actions";

export const createPermissionGroup = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_PERMISSION_GROUP_LOADING });

        const fialureOrData = await PermissionsRepository.getInstance().createPermissionGroup(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.CREATE_PERMISSION_GROUP_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.CREATE_PERMISSION_GROUP_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
            if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_PERMISSION_GROUP_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
