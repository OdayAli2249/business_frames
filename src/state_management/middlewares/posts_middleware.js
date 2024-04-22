import { ProcessResult } from "../../helpers/failure_or";
import { PostRepository } from "../../repositories/post_repository";
import { Actions } from "../actions";

export const getPosts = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.GET_POSTS_LOADING });

        const fialureOrData = await PostRepository.getInstance().getPostsWithPermissions(params);
        await sleep(2000);
        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({ type: Actions.GET_POSTS_SUCCESS, payload: { items: fialureOrData.response.data } }) :
            dispatch({ type: Actions.GET_POSTS_FAILURE, payload: { failure: fialureOrData.failure } });
        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
