import { Actions } from "../actions";

const initialState = {
    data: null,
    loading: true,
    failure: null,
};

const getServiceProvidersReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_SERVICE_PROVIDERS_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                failure: null,
            };
        case Actions.GET_SERVICE_PROVIDERS_LOADING:
            return {
                data: null,
                loading: true,
                failure: null,
            };
        case Actions.GET_SERVICE_PROVIDERS_FAILURE:
            return {
                data: null,
                loading: false,
                failure: action.payload.failure,
            };
        default:
            return state;
    }
};

export default getServiceProvidersReducer;
