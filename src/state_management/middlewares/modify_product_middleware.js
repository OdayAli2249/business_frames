import { ProcessResult } from "../../helpers/failure_or";
import { ProductRepository } from "../../repositories/product_repository";
import { Actions, Operations } from "../actions";

export const modifyProduct = (params) => {
    return async (dispatch) => {
        dispatch({ type: Actions.MODIFY_PRODUCT_LOADING });
        console.log(params);
        let fialureOrData;
        if (params.operation == Operations.CREATE)
            fialureOrData = await ProductRepository.getInstance().createProduct(params);
        else if (params.operation == Operations.EDIT)
            fialureOrData = await ProductRepository.getInstance().updateProduct(params);
        else if (params.operation == Operations.REMOVE)
            fialureOrData = await ProductRepository.getInstance().deleteProduct(params);

        await sleep(2000);

        fialureOrData.result == ProcessResult.SUCCESS ?
            dispatch({
                type: Actions.MODIFY_PRODUCT_SUCCESS,
                payload: { message: 'fialureOrData.data.templateMessage' }
            }) :
            dispatch({
                type: Actions.MODIFY_PRODUCT_FAILURE,
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
        dispatch({ type: Actions.MODIFY_PRODUCT_RESET });
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
