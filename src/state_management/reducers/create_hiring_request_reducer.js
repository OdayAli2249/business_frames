import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const createHiringRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CREATE_HIRING_REQUEST_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.CREATE_HIRING_REQUEST_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.CREATE_HIRING_REQUEST_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.CREATE_HIRING_REQUEST_RESET:
            return initialState;

        default:
            return state;
    }
};

export default createHiringRequestReducer;
