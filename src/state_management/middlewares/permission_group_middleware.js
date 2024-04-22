import { ProcessResult } from "../../helpers/failure_or";
import { PermissionsRepository } from "../../repositories/permissions_repository";
import { Actions } from "../actions";

export const getPermissionGroups = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_PERMISSION_GROUPS_LOADING });

        const fialureOrData = await PermissionsRepository.getInstance().getPermissionGroups(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_PERMISSION_GROUPS_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_PERMISSION_GROUPS_FAILURE, payload: { failure: fialureOrData.failure } });

        if (fialureOrData.failure && fialureOrData.failure.code == 401 && !params.byRefresh)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });

    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
