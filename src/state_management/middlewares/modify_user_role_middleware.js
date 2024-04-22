import { ProcessResult } from "../../helpers/failure_or";
import { BranchRepository } from "../../repositories/branch_repository";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const modifyUserRole = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_USER_ROLE_LOADING });

        let fialureOrData;
        if (params.role) {
            fialureOrData = params.role == 'sub-master' ?
                await ServiceProviderRepository.getInstance().removeSubMasterUser(params) :
                await ServiceProviderRepository.getInstance().addSubMasterUser(params);
        } else {
            if (params.userBranchParams.operation == 'remove') {
                fialureOrData = await BranchRepository.getInstance().removeExistedUsersFromBranch(params);
            } else if (params.userBranchParams.operation == 'copy') {
                fialureOrData = await BranchRepository.getInstance().addExistedUsersToBranch(params);
            } else if (params.userBranchParams.operation == 'transfer') {
                fialureOrData = await BranchRepository.getInstance().transferExistedUsersToBranch(params);
            }
        }

        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_USER_ROLE_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_USER_ROLE_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });

        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_USER_ROLE_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
