import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const modifyServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.MODIFY_SERVICE_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.MODIFY_SERVICE_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.MODIFY_SERVICE_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.MODIFY_SERVICE_RESET:
            return initialState;

        default:
            return state;
    }
};

export default modifyServiceReducer;
