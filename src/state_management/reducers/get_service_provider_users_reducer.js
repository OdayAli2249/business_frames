
import { Actions } from "../actions";

const initialState = {
    data: null,
    loading: true,
    failure: null,
};

const getServiceProviderUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_SERVICE_PROVIDER_USERS_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                failure: null,
            };
        case Actions.GET_SERVICE_PROVIDER_USERS_LOADING:
            return {
                data: null,
                loading: true,
                failure: null,
            };
        case Actions.GET_SERVICE_PROVIDER_USERS_FAILURE:
            return {
                data: null,
                loading: false,
                failure: action.payload.failure,
            };
        default:
            return state;
    }
};

export default getServiceProviderUsersReducer;
