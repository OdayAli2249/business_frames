import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const modifyPermissionGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.MODIFY_PERMISSION_GROUP_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.MODIFY_PERMISSION_GROUP_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.MODIFY_PERMISSION_GROUP_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.MODIFY_PERMISSION_GROUP_RESET:
            return initialState;

        default:
            return state;
    }
};

export default modifyPermissionGroupReducer;
