import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const modifyUserRoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.MODIFY_USER_ROLE_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.MODIFY_USER_ROLE_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.MODIFY_USER_ROLE_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.MODIFY_USER_ROLE_RESET:
            return initialState;

        default:
            return state;
    }
};

export default modifyUserRoleReducer;
