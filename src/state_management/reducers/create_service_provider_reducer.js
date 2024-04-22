import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const createServiceProviderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CREATE_SERVICE_PROVIDERS_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.CREATE_SERVICE_PROVIDERS_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.CREATE_SERVICE_PROVIDERS_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.CREATE_SERVICE_PROVIDERS_RESET:
            return initialState;

        default:
            return state;
    }
};

export default createServiceProviderReducer;
