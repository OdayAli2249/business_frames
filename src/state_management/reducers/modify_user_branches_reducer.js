import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const modifyUserBranchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.MODIFY_USER_BRANCHES_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.MODIFY_USER_BRANCHES_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.MODIFY_USER_BRANCHES_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.MODIFY_USER_BRANCHES_RESET:
            return initialState;

        default:
            return state;
    }
};

export default modifyUserBranchesReducer;
