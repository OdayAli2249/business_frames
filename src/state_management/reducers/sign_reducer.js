import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const signReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SIGN_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.SIGN_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.SIGN_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.SIGN_RESET:
            return initialState;

        default:
            return state;
    }
};

export default signReducer;
