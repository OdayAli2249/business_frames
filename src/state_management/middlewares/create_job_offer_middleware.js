import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const createJobOffer = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_JOB_OFFER_LOADING });

        const fialureOrData = await ServiceProviderRepository.getInstance().binJobOfferCollectionItem(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.CREATE_JOB_OFFER_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.CREATE_JOB_OFFER_FAILURE,
                payload: { message: fialureOrData.failure.description[0] }
            });
            if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.CREATE_JOB_OFFER_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
