import { ProcessResult } from "../../helpers/failure_or";
import { PostRepository } from "../../repositories/post_repository";
import { Actions, Operations } from "../actions";

export const modifyPost = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_POST_LOADING });
        let fialureOrData;
        if (params.operation == Operations.CREATE)
            fialureOrData = await PostRepository.getInstance().createPost(params);
        else if (params.operation == Operations.EDIT)
            fialureOrData = await PostRepository.getInstance().updatePost(params);
        else if (params.operation == Operations.REMOVE)
            fialureOrData = await PostRepository.getInstance().deletePost(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_POST_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_POST_FAILURE,
                payload: {
                    message: fialureOrData.failure.description ? fialureOrData.failure.description[0]
                        : "--Error! operation hasn't been completed"
                }
            });

        if (fialureOrData.failure && fialureOrData.failure.code == 401)
            dispatch({ type: Actions.UNAUTHORIZED_FAILURE, payload: { failure: '1', type: 0 } });
    };
};

export const reset = () => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_POST_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
