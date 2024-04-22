import { ProcessResult } from "../../helpers/failure_or";
import { ServiceProviderRepository } from "../../repositories/service_provider_repository";
import { Actions } from "../actions";

const serviceProviders = [
    { name: 'SP1' },
    { name: 'SP2' },
    { name: 'SP3' },
    { name: 'SP4' },
    { name: 'SP5' },
    { name: 'SP6' },
    { name: 'SP7' },
    { name: 'SP8' },
    { name: 'SP9' },
    { name: 'SP10' },
    { name: 'SP11' },
    { name: 'SP12' },
    { name: 'SP13' },
    { name: 'SP14' },
    { name: 'SP15' },
]

export const getServiceProviders = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_SERVICE_PROVIDERS_LOADING });

        const fialureOrData = await ServiceProviderRepository.getInstance().getServiceProviders(params);
        // const data = await response.json();
        await sleep(2000);
        // var res = {
        //     response: {
        //         items: serviceProviders
        //             // .filter(val => val.name.includes(params.query))
        //             .slice(params.offset, params.offset + params.limit)
        //     }, result: ProcessResult.SUCCESS
        // }
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_SERVICE_PROVIDERS_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_SERVICE_PROVIDERS_FAILURE, payload: { failure: fialureOrData.failure } });
        
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
