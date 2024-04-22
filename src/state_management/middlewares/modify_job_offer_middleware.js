import { ProcessResult } from "../../helpers/failure_or";
import { HiringRequestRepository } from "../../repositories/hiring_request_repository";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions, Operations } from "../actions";

export const modifyJobOffer = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_JOB_OFFERS_LOADING });
        let fialureOrData;
        if (params.operation == Operations.CREATE && params.subject == 'hiring-request')
            fialureOrData = await HiringRequestRepository.getInstance().createHiringRequest(params);
        else if (params.operation == Operations.CREATE && params.subject == 'job-offer')
            fialureOrData = await ServiceProviderRepository.getInstance().binJobOfferCollectionItem(params);
        else if (params.operation == Operations.REMOVE)
            fialureOrData = await ServiceProviderRepository.getInstance().unbinJobOfferCollectionItem(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_JOB_OFFERS_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_JOB_OFFERS_FAILURE,
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
        dispatch({ type: Actions.MODIFY_JOB_OFFERS_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
