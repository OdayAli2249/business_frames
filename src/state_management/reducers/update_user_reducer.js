import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.UPDATE_USER_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.UPDATE_USER_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.UPDATE_USER_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.UPDATE_USER_RESET:
            return initialState;

        default:
            return state;
    }
};

export default updateUserReducer;
