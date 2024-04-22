import { ProcessResult } from "../../helpers/failure_or";
import { PermissionsRepository } from "../../repositories/permissions_repository";
import { Actions, Operations } from "../actions";

export const modifyPermissionGroup = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_PERMISSION_GROUP_LOADING });
        let fialureOrData;
        if (params.operation == Operations.CREATE)
            fialureOrData = await PermissionsRepository.getInstance().createPermissionGroup(params);
        else if (params.operation == Operations.EDIT)
            fialureOrData = await PermissionsRepository.getInstance().updatePermissionGroup(params);
        else if (params.operation == Operations.REMOVE)
            fialureOrData = await PermissionsRepository.getInstance().deletePermissionGroup(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_PERMISSION_GROUP_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_PERMISSION_GROUP_FAILURE,
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
        dispatch({ type: Actions.MODIFY_PERMISSION_GROUP_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
