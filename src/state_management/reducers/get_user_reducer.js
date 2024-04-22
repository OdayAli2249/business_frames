import { Actions } from "../actions";

const initialState = {
    data: null,
    loading: true,
    failure: null,
    type: null
};

const getUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_USER_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                failure: null,
                type: action.payload.type
            };
        case Actions.GET_USER_LOADING:
            return {
                data: null,
                loading: true,
                failure: null,
            };
        case Actions.UNAUTHORIZED_FAILURE:
            return {
                data: null,
                loading: false,
                failure: action.payload.failure,
                type: action.payload.type
            };
        default:
            return state;
    }
};

export default getUserReducer;
