import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

export const getJobOffers = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_JOB_OFFERS_LOADING });

        let fialureOrData = await ServiceProviderRepository.getInstance().getServiceProviderById(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.GET_JOB_OFFERS_SUCCESS, payload: {
                    items: fialureOrData.response.data && fialureOrData.response.data.jobOfferCollection ?
                        fialureOrData.response.data.jobOfferCollection.map((jobOffer) => JSON.parse(jobOffer)) : []
                }
            })
            :
            dispatch({ type: Actions.GET_JOB_OFFERS_FAILURE, payload: { failure: fialureOrData.failure } });

        if (fialureOrData.failure && fialureOrData.failure.code == 401 && !params.byRefresh)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
