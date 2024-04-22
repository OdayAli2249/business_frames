import { Actions } from "../actions";

const initialState = {
    success: null,
    loading: false,
    failure: null,
};

const createBranchReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CREATE_BRANCH_SUCCESS:
            return {
                data: action.payload,
                success: true,
                loading: false,
                failure: null,
            };
        case Actions.CREATE_BRANCH_LOADING:
            return {
                success: null,
                loading: true,
                failure: null,
            };
        case Actions.CREATE_BRANCH_FAILURE:
            return {
                success: null,
                loading: false,
                failure: action.payload,
            };
        case Actions.CREATE_BRANCH_RESET:
            return initialState;

        default:
            return state;
    }
};

export default createBranchReducer;
